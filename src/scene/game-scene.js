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
        goal : null
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
      // 画面タップのたびにcountを-1
      var touchPos = this._views.buttonTap._touchBeganPosition;
      var playerPos = this._views.player.getPosition();
      this._count--;
      this._views.labelScore.setString('残り：' + this._count);
      var newPlayerPos = this._views.player.getPositionX() + 10;
			this._views.player.setPositionX(newPlayerPos);

      // countが0以下でゲーム終了
      if (this._count <= 0) {
        // ボタン表示切り替え
        this._views.buttonTap.setVisible(false);
        this._views.buttonBack.setVisible(true);

        // スコア更新
        util.score.updateScore(this._param.difficulty, this._time);

        // updateを呼ばないように
        this.unscheduleUpdate();
      }
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

    //仮の移動ボタン
    //壁があったら進めないように
    _onClickBtnRight : function(index) {
      var offsetX = 10;
      var offsetY = 0;
      if(!this._checkTouchingWithEachWall(offsetX, offsetY) && this._playingFlg){
        var newPlayerPosX = this._views.player.getPositionX() + offsetX;
        var newPlayerPosY = this._views.player.getPositionY() + offsetY;
        this._views.player.setPosition(newPlayerPosX, newPlayerPosY);
      }
    },
    _onClickBtnLeft : function(index) {
      var offsetX = -10;
      var offsetY = 0;
      if(!this._checkTouchingWithEachWall(offsetX, offsetY) && this._playingFlg){
        var newPlayerPosX = this._views.player.getPositionX() + offsetX;
        var newPlayerPosY = this._views.player.getPositionY() + offsetY;
        this._views.player.setPosition(newPlayerPosX, newPlayerPosY);
      }
    },
    _onClickBtnUp : function(index) {
      var offsetX = 0;
      var offsetY = 10;
      if(!this._checkTouchingWithEachWall(offsetX, offsetY) && this._playingFlg){
        var newPlayerPosX = this._views.player.getPositionX() + offsetX;
        var newPlayerPosY = this._views.player.getPositionY() + offsetY;
        this._views.player.setPosition(newPlayerPosX, newPlayerPosY);
      }
    },
    _onClickBtnDown : function(index) {
      var offsetX = 0;
      var offsetY = -10;
      if(!this._checkTouchingWithEachWall(offsetX, offsetY) && this._playingFlg){
        var newPlayerPosX = this._views.player.getPositionX() + offsetX;
        var newPlayerPosY = this._views.player.getPositionY() + offsetY;
        this._views.player.setPosition(newPlayerPosX, newPlayerPosY);
      }
    },
    _onClickButtonBack : function() {
      util.scene.popScene();
    }
  });
																			
  return GameScene;
})();
