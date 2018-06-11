scene.GameScene = (function() {
  'use strict';

  var GameScene = scene.BaseScene.extend({
    _className : 'GameScene',
    ctor : function(param) {
      this._super(param);
      cc.log(param);

      this._time = 30;
      this._count = 0;
      
      this._playingFlg = false;
      this._playerMoveParam = {
        //プレイヤーを動かすのに必要なパラメーター
        moveSpeed : 10,//単位はピクセル/frame
        movingFlg : false,
        moveToPos : null,
        //1frameあたりに動く距離（毎フレーム計算したくないのでパラメーターとしてもっとく）
        diffX : 0,
        diffY : 0
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
        var nowPlayerPos = this._views.player.getPosition();
        //タップした場所についたら止まる
        if(Math.abs(nowPlayerPos.x - this._playerMoveParam.moveToPos.x) > 1 || Math.abs(nowPlayerPos.y - this._playerMoveParam.moveToPos.y) > 1){
          this._views.player.setPosition(nowPlayerPos.x + this._playerMoveParam.diffX, nowPlayerPos.y + this._playerMoveParam.diffY);
        }
        else{
          this._playerMovingFlg = false;
        }
      }

      var playerRect = this._views.player.getBoundingBox();
      var goalRect = this._views.goal.getBoundingBox();

      if(cc.rectIntersectsRect(playerRect, goalRect)){
        //ゴールに到着でゲーム終了
        this._views.labelClear.setVisible(true);
        this.unscheduleUpdate();
        this._playingFlg = false
      }

      if(this._time < 0){
        //時間切れでゲーム終了
        this._views.labelGameOver.setVisible(true);
        this.unscheduleUpdate();
        this._playingFlg = false
      }
    },

    _onClickButtonTap : function(index) {
      // 画面をタップしたらそこに向かってプレイヤーが動きます。
      this._playerMoveParam.moveToPos = this._views.buttonTap._touchBeganPosition;
      var nowPlayerPos = this._views.player.getPosition();
      //var nowPlayerPosY = this._views.player.getPositionY;

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
    _onClickButtonBack : function() {
      util.scene.popScene();
    }
  });
																			
  return GameScene;
})();
