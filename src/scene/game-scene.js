scene.GameScene = (function() {
  'use strict';

  var GameScene = scene.BaseScene.extend({
    _className : 'GameScene',
    ctor : function(param) {
      this._super(param);
      cc.log(param);

      this._time = 30;
      this._count = 0;
      this._currentStage = 1;

      this._playerInitPos = null;
      this._goalInitPos = null;
      this._wallInitPos = [];
      
      this._playingFlg = false;
      this._playerMoveParam = {
        //プレイヤーを動かすのに必要なパラメーター
        moveSpeed : 10,//単位はピクセル/frame
        movingFlg : false,
        moveToPos : null,

        //1frameあたりに動く距離（毎フレーム計算したくないのでパラメーターとしてもっとく）
        diffX : 0,
        diffY : 0,

        //タップした場所についたかどうか判定用
        frameCount : 0
      }

      this._views = {
        labelDifficulty : null,
        labelScore : null,
        labelTime : null,
        labelClear : null,
        labelGameOver : null,
        buttonTap : null,
        btnLeft : null,
        buttonBack : null,
        player : null,
        walls : [],
        goal : null,
      };
    },
    onEnter : function() {
      this._super();
      this._loadScene(res.GameScene);

      // レベル毎の設定
      var title = '';
      var difficulty = this._param.difficulty;
      switch (difficulty) {
      case DifficultyType.EASY:
        title = '難易度：EASY';
        this._count = 30;
        break;
      case DifficultyType.NORMAL:
        title = '難易度：NORMAL';
        this._count = 50;
        break;
      case DifficultyType.HARD:
        title = '難易度：HARD';
        this._count = 100;
        break;
      }

      // UIを初期化
      this._views.labelDifficulty.setString(title);
      this._views.labelTime.setString(this._time);
      this._views.buttonTap.setVisible(false);

      this._views.labelClear.setVisible(false);
      this._views.labelGameOver.setVisible(false);

      //プレイヤーとゴール、外枠の初期位置を記録しておく
      this._playerInitPos = this._views.player.getPosition();
      this._goalInitPos = this._views.goal.getPosition();
      for(var i = 0; i < 4; i++){
        this._wallInitPos[i] = this._views.walls[i].getPosition();
      }
      
      //迷路生成
      this._createMaze(this._currentStage);

      // アニメーション再生
      this._ccsData.action.play('ready', false);

      this._playingFlg = true;

      // readyアニメーションが終わったら呼ばれる処理
      this._ccsData.action.setLastFrameCallFunc(() => {
        // nullを設定しないとgoアニメーションの後にも繰り返し呼ばれるので注意！
        this._ccsData.action.setLastFrameCallFunc(null);
        this._ccsData.action.play('go', false);

        // ゲーム開始
        this._views.buttonTap.setVisible(true);
        this._views.labelScore.setString('Tap Me!!');

        // updateを毎フレーム呼ぶように
        this.scheduleUpdate();
      });
    },

    update : function(dt) {
      this._time -= dt;
      this._views.labelTime.setString(this._time.toFixed(1));

      //プレイヤーの移動
      if(this._playingFlg && this._playerMovingFlg && !this._checkTouchingWithEachWall(this._playerMoveParam.diffX, this._playerMoveParam.diffY)){
        //タップした場所についたら止まる
        if(this._playerMoveParam.frameCount < this._playerMoveParam.moveSpeed){
          for(var i = 0; i < this._views.walls.length; i++){
            var wall = this._views.walls[i];
            wall.setPosition(wall.getPositionX() - this._playerMoveParam.diffX, wall.getPositionY() - this._playerMoveParam.diffY);
          }

          var goal = this._views.goal;
          goal.setPosition(goal.getPositionX() - this._playerMoveParam.diffX, goal.getPositionY() - this._playerMoveParam.diffY);

          this._playerMoveParam.frameCount++;
        }
        else{
          this._playerMovingFlg = false;
        }
      }

      var playerRect = this._views.player.getBoundingBox();
      var goalRect = this._views.goal.getBoundingBox();

      if(cc.rectIntersectsRect(playerRect, goalRect)){
        //ゴールに到着、かつステージ１０でゲーム終了
        if(this._currentStage === 10){
          this._views.labelClear.setVisible(true);
          this.unscheduleUpdate();
          this._playingFlg = false;
        }
        else{
          //ステージ10までいってなかったら次のステージへ
          this._goToNextStage();
        }
      }

      // if(this._time < 0){
      //   //時間切れでゲーム終了
      //   this._views.labelGameOver.setVisible(true);
      //   this.unscheduleUpdate();
      //   this._playingFlg = false
      // }
    },

    _onClickButtonTap : function(index) {
      // 画面をタップしたらそこに向かってプレイヤーが動きます。
      //必要なパラメータ初期化
      this._playerMoveParam.frameCount = 0;
      this._playerMoveParam.moveToPos = this._views.buttonTap._touchBeganPosition;

      var nowPlayerPos = this._views.player.getPosition();

      //１フレームあたりの動く距離を保存しとく（いちいち計算したくないので）
      this._playerMoveParam.diffX = (this._playerMoveParam.moveToPos.x - nowPlayerPos.x) / this._playerMoveParam.moveSpeed;
      this._playerMoveParam.diffY = (this._playerMoveParam.moveToPos.y - nowPlayerPos.y) / this._playerMoveParam.moveSpeed;

      this._playerMovingFlg = true;
    },

    _checkTouchingWithEachWall : function(offsetX, offsetY) {
      //いずれかの壁とプレイヤーの接触判定
      var playerRect = this._views.player.getBoundingBox();
      //移動後のプレイヤーの場所で判定を行う（めり込んで動けなくなるの防止）
      var movedPlayerRect = cc.rect({x: (playerRect.x + offsetX), y: (playerRect.y + offsetY), width: (playerRect.width), height: (playerRect.height)});

      for(var i = 0; i < this._views.walls.length; i++){
        var wall = this._views.walls[i];
        var wallRect = wall.getBoundingBox();
      
        if(cc.rectIntersectsRect(movedPlayerRect, wallRect)){
          return true;
        }
      }
      return false;
    },

    _createMaze : function(stage) {
      //迷路をコードから作ります
      
      //情報格納用配列(実質な迷路としては10 * 10、外壁も入れて12 * 12)
      var mazeInfoArray = new Array(12);
      for(var i = 0; i < 12; i++) {
        mazeInfoArray[i] = new Array(12).fill(0);
      }

      for(var i = 0; i < 12; i++){
        //外壁を作ります。
        mazeInfoArray[0][i] = "#"
        mazeInfoArray[i][0] = "#"
        mazeInfoArray[11][11 - i] = "#"
        mazeInfoArray[11 - i][11] = "#"
      }

      //スタートとゴールの位置を設定
      var nowIdx = {y : 10, x : 1}
      mazeInfoArray[10][1] = "@"

      var goalPos = {
        x : 10,
        y : 1
      };

      //ランダムに方向を決めてゴールまで進む（斜めはなし）
      var goaledFlg = false;
      var wallPosList = [];//「経路を伸ばせる（＝０に隣接してる）壁の位置」をリストに記録しておく
      
      while(!goaledFlg){
        //方向を定義（ランダム）
        var direcX = 0;
        var direcY = 0;
        if(Math.random() > 0.5){
          direcX = 1;
        }
        else{
          direcY = -1;
        }

        var moveToPos = {
          x : nowIdx.x + direcX,
          y : nowIdx.y + direcY
        }

        //移動先の座標がアップデート済みならそのステップをやり直し
        if(mazeInfoArray[moveToPos.y][moveToPos.x] !== 0){
          continue;
        }

        //通った経路を"@"で記録
        mazeInfoArray[nowIdx.y + direcY][nowIdx.x + direcX] = '@';

        //現在位置の上下左右に０があったらそこを壁にするので"#"で記録
        //上下左右のどこをアップデートしたかのフラグ
        var updatedFlg = {
          up : false,
          down : false,
          left : false,
          right : false,
        }
        if(mazeInfoArray[nowIdx.y - 1][nowIdx.x] === 0){
          mazeInfoArray[nowIdx.y - 1][nowIdx.x] = '#';
          wallPosList.push({x : nowIdx.x, y : nowIdx.y - 1});
          updatedFlg.up = true;
        }
        if(mazeInfoArray[nowIdx.y + 1][nowIdx.x] === 0){
          mazeInfoArray[nowIdx.y + 1][nowIdx.x] = '#';
          wallPosList.push({x : nowIdx.x, y : nowIdx.y + 1});
          updatedFlg.down = true;
        }
        if(mazeInfoArray[nowIdx.y][nowIdx.x + 1] === 0){
          mazeInfoArray[nowIdx.y][nowIdx.x + 1] = '#';
          wallPosList.push({x : nowIdx.x + 1, y : nowIdx.y});
          updatedFlg.right = true;
        }
        if(mazeInfoArray[nowIdx.y][nowIdx.x - 1] === 0){
          mazeInfoArray[nowIdx.y][nowIdx.x - 1] = '#';
          wallPosList.push({x : nowIdx.x - 1, y : nowIdx.y});
          updatedFlg.left = true;
        }

        if(!updatedFlg.up && !updatedFlg.down && !updatedFlg.right && !updatedFlg.left){
          //袋小路（上下左右全て上書きできない）ときは、０に隣接している壁をランダムに探して現在位置にして再開
        }

        //ゴールの一歩手前まできたらしたら繰り返ししないようにフラグ更新
        //ついでにゴールの周りに０があったら壁にする
        if(moveToPos.x === goalPos.x && moveToPos.y === goalPos.y){
          goaledFlg = true;
          mazeInfoArray[1][10] = "@"
          if(mazeInfoArray[goalPos.y][goalPos.x - 1] === 0){
            mazeInfoArray[goalPos.y][goalPos.x - 1] = '#';
            wallPosList.push({x : goalPos.x - 1, y : goalPos.y});
          }
          if(mazeInfoArray[goalPos.y + 1][goalPos.x] === 0){
            mazeInfoArray[goalPos.y + 1][goalPos.x] = '#';
            wallPosList.push({x : goalPos.x, y : goalPos.y + 1});
          }
          continue;
        }

        //現在位置更新
        nowIdx.x = nowIdx.x + direcX;
        nowIdx.y = nowIdx.y + direcY;
      }
      
      this._setWallSprite(wallPosList);
    },

    _checkMazeValidation : function(mazeElem) {
      //迷路を上書きしていいかどうかのチェック
      //移動先がスタート、ゴール、すでに通った経路、壁のいずれかを満たしたらfalseを返す
      if(mazeElem === "S" || mazeElem === "G" || mazeElem === "@" || mazeElem === "#"){
        return false;
      }

      return true;
    },

    _setWallSprite : function(wallPosList) {
      //壁スプライトの設置
      //左下の角の位置を基準にします
      var posOffsetX = 74.50 + 40;
      var posOffsetY = 165.50 + 45;

      //もろもろのパラメータ設定してaddChild
      for(var i = 0; i < wallPosList.length; i++){
        var wall = cc.Sprite.create("res/images/ui/common/wall.png");
        wall.setPosition(posOffsetX + ((wallPosList[i].x - 1) * 80) , posOffsetY + ((11 - wallPosList[i].y - 1) * 80));  
        wall.setScale(0.05, 0.08);
        this.addChild(wall, 0);
        this._views.walls.push(wall); // _wallsという配列に追加して保持しておく
      }
    },

    _goToNextStage : function() {
      //次のステージへ進む処理
      this._currentStage++;
      this._time = this._time + 10;

      //プレイヤーとゴールと外枠の壁を初期位置へ
      this._views.player.setPosition(this._playerInitPos);
      this._views.goal.setPosition(this._goalInitPos);
      for(var i = 0; i < this._views.walls.length; i++){
        if(i < 4){
          this._views.walls[i].setPosition(this._wallInitPos[i]);
        }
        else{
          this.removeChild(this._views.walls[i]);
        }
      }
      this._views.walls.splice(4, (this._views.walls.length - 1));

      this._createMaze(this._currentStage);
    },

    _onClickButtonBack : function() {
      util.scene.popScene();
    }
  });
																			
  return GameScene;
})();
