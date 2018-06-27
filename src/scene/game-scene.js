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
      
      //情報格納用配列
      var mazeInfoArray = new Array(10);
      for(let i = 0; i < 10; i++) {
        mazeInfoArray[i] = new Array(10).fill(0);
      }

      //スタートとゴールの位置を設定
      mazeInfoArray[9][0] = 'S';//スタート
      mazeInfoArray[0][9] = 'G';//ゴール

      //スタート→ゴールへの一直線の道を"@"で作る
      //スタート、ゴール、現在位置のインデックス番号を記録
      var startIdx = {y : 9, x : 0 }
      var goalIdx = {y : 0, x : 9}
      var nowIdx = {y : 9, x : 0}

      //スタートからゴールと同じ列に当たるまで右に一直線に進む
      //端にぶつかったらゴールにたどり着くまで上に一直線に進む
      //進んだ道は'@'で上書き
      var direcX = goalIdx.x - nowIdx.x;//方向を定義
      var direcY = goalIdx.y - nowIdx.y;
      while(nowIdx.x !== goalIdx.x || nowIdx.y !== goalIdx.y){
        if(nowIdx.x < goalIdx.x){
          nowIdx.x = nowIdx.x + (direcX / Math.abs(direcX));
          mazeInfoArray[nowIdx.y][nowIdx.x] = '@';
        }
        else{
          if(nowIdx.y > goalIdx.y){
            nowIdx.y = nowIdx.y + (direcY / Math.abs(direcY));
            if(mazeInfoArray[nowIdx.y][nowIdx.x] !== 'G'){
              mazeInfoArray[nowIdx.y][nowIdx.x] = '@';
            }
          }
        }
      }
      
      this._setWallSprite(stage);
    },

    _setWallSprite : function(stage) {
      //スプライトの設置
      var wall = cc.Sprite.create("res/images/ui/common/wall.png");

      //左の枠の位置を基準にします
      var posOffsetX = this._views.walls[0].getPositionX();
      var posOffsetY = this._views.walls[0].getPositionY();

      //もろもろのパラメータ設置してaddChild
      wall.setPosition(posOffsetX + (100 * stage) , posOffsetY + 100);  
      wall.setScale(0.1, 0.1);
      this.addChild(wall, 0);
      this._views.walls.push(wall); // _wallsという配列に追加して保持しておく
    },

    _goToNextStage : function() {
      //次のステージへ進む処理
      this._currentStage++;
      this._time = this._time + 10;

      //プレイヤーとゴールと外枠の壁を初期位置へ
      this._views.player.setPosition(this._playerInitPos);
      this._views.goal.setPosition(this._goalInitPos);
      for(var i = 0; i < 4; i++){
         this._views.walls[i].setPosition(this._wallInitPos[i]);
      }

      this._createMaze(this._currentStage);
    },

    _onClickButtonBack : function() {
      util.scene.popScene();
    }
  });
																			
  return GameScene;
})();
