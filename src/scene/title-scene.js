scene.TitleScene = (function() {
  'use strict';

  var TitleScene = scene.BaseScene.extend({
    _className : 'TitleScene',
    ctor : function(param) {
      this._super(param);
    },
    onEnter : function() {
      this._super();
      this._loadScene(res.TitleScene);

      // アニメーション再生
      // this._ccsData.action.play('アニメーション名', ループ有無);
      this._ccsData.action.play('wait', true);
    },
    _onClickButtonStart : function(index) {
      util.scene.replaceScene(scene.DifficultyScene);
    }
  });
  return TitleScene;
})();
