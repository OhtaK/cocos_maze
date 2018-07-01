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
    _onClickBtnStart : function(index) {
      util.scene.pushScene(scene.GameScene, {
        difficulty : index
      });
    }
  });
  return TitleScene;
})();
