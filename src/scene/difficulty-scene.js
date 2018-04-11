scene.DifficultyScene = (function() {
  'use strict';

  var DifficultyScene = scene.BaseScene.extend({
    _className : 'DifficultyScene',
    ctor : function(param) {
      this._super(param);
      this._views = {
        labelScore : []
      };
    },
    onEnter : function() {
      this._super();
      this._loadScene(res.DifficultyScene);
      this._updateView();
    },
    _updateView : function() {
      this._views.labelScore.forEach((labelScore, index) => {
        var score = util.score.getScore(index);
        if (score <= 0) {
          labelScore.setString('----');
        } else {
          labelScore.setString(score + 's');
        }
      });
    },
    _onClickButtonDifficulty : function(index) {
      cc.audioEngine.playEffect('res/se/se_tap.mp3', false);
      util.scene.pushScene(scene.GameScene, {
        difficulty : index
      });
    },
    _onClickButtonReset : function() {
      this._showYesNoDialog('確認', 'ハイスコア情報をリセットします\nよろしいですか？', () => {
        util.score.initializeScore(true);
        this._updateView();
        this._showMessageDialog('おしらせ', 'リセットが完了しました');
      });
    }
  });
  return DifficultyScene;
})();