var res = {
  // Scene
  TitleScene : 'res/scene/TitleScene.json',
  GameScene : 'res/scene/GameScene.json',
  DifficultyScene : 'res/scene/DifficultyScene.json',
  // Dialog
  MessageDialog : 'res/dialog/MessageDialog.json',
  YesNoDialog : 'res/dialog/YesNoDialog.json'
};

var gResources = [];
for (var i in res) {
  gResources.push(res[i]);
}
