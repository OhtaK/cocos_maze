<GameFile>
  <PropertyGroup Name="DifficultyScene" Type="Scene" ID="fd6ac265-2e19-4373-a5e4-f22a7c538b55" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="0" Speed="1.0000" />
      <ObjectData Name="Scene" Tag="120" ctype="GameNodeObjectData">
        <Size X="640.0000" Y="1136.0000" />
        <Children>
          <AbstractNodeData Name="spriteBg" ActionTag="488315590" Tag="10" IconVisible="False" ctype="SpriteObjectData">
            <Size X="640.0000" Y="1136.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="320.0000" Y="568.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.5000" />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="images/ui/common/back.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="labelTitle" ActionTag="-2023045729" Tag="127" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="102.5000" RightMargin="102.5000" TopMargin="142.5000" BottomMargin="926.5000" FontSize="45" LabelText="難易度を選択してね！" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
            <Size X="435.0000" Y="67.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="320.0000" Y="960.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.8451" />
            <PreSize X="0.6797" Y="0.0590" />
            <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="panelButton" ActionTag="-853032980" Tag="123" IconVisible="False" LeftMargin="154.1552" RightMargin="135.8448" TopMargin="464.7671" BottomMargin="396.2329" TouchEnable="True" ClipAble="False" BackColorAlpha="102" ColorAngle="90.0000" Scale9Width="1" Scale9Height="1" ctype="PanelObjectData">
            <Size X="350.0000" Y="275.0000" />
            <Children>
              <AbstractNodeData Name="buttonDifficulty[0]" ActionTag="-1900001195" Tag="122" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" BottomMargin="200.0000" TouchEnable="True" FontSize="30" ButtonText="Easy" Scale9Enable="True" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="10" Scale9Height="11" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="350.0000" Y="75.0000" />
                <Children>
                  <AbstractNodeData Name="labelScore[0]" ActionTag="-346078287" Tag="23" IconVisible="False" LeftMargin="263.0000" RightMargin="15.0000" TopMargin="22.5000" BottomMargin="22.5000" FontSize="20" LabelText="999.9s" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="72.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="299.0000" Y="37.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8543" Y="0.5000" />
                    <PreSize X="0.2057" Y="0.4000" />
                    <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="175.0000" Y="237.5000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.8636" />
                <PreSize X="1.0000" Y="0.2727" />
                <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
                <TextColor A="255" R="255" G="255" B="255" />
                <DisabledFileData Type="Normal" Path="images/ui/common/btn_info_highlight.png" Plist="" />
                <PressedFileData Type="Normal" Path="images/ui/common/btn_info_highlight.png" Plist="" />
                <NormalFileData Type="Normal" Path="images/ui/common/btn_info.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="buttonDifficulty[1]" ActionTag="-549102681" Tag="131" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TopMargin="100.0000" BottomMargin="100.0000" TouchEnable="True" FontSize="30" ButtonText="Normal" Scale9Enable="True" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="10" Scale9Height="11" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="350.0000" Y="75.0000" />
                <Children>
                  <AbstractNodeData Name="labelScore[1]" ActionTag="-1171048422" Tag="24" IconVisible="False" LeftMargin="263.0000" RightMargin="15.0000" TopMargin="22.5000" BottomMargin="22.5000" FontSize="20" LabelText="999.9s" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="72.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="299.0000" Y="37.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8543" Y="0.5000" />
                    <PreSize X="0.2057" Y="0.4000" />
                    <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="175.0000" Y="137.5000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.5000" />
                <PreSize X="1.0000" Y="0.2727" />
                <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
                <TextColor A="255" R="255" G="255" B="255" />
                <DisabledFileData Type="Normal" Path="images/ui/common/btn_info_highlight.png" Plist="" />
                <PressedFileData Type="Normal" Path="images/ui/common/btn_info_highlight.png" Plist="" />
                <NormalFileData Type="Normal" Path="images/ui/common/btn_info.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="buttonDifficulty[2]" ActionTag="912364179" Tag="132" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" TopMargin="200.0000" TouchEnable="True" FontSize="30" ButtonText="Hard" Scale9Enable="True" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="10" Scale9Height="11" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="350.0000" Y="75.0000" />
                <Children>
                  <AbstractNodeData Name="labelScore[2]" ActionTag="353067554" Tag="25" IconVisible="False" LeftMargin="263.0000" RightMargin="15.0000" TopMargin="22.5000" BottomMargin="22.5000" FontSize="20" LabelText="999.9s" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
                    <Size X="72.0000" Y="30.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="299.0000" Y="37.5000" />
                    <Scale ScaleX="1.0000" ScaleY="1.0000" />
                    <CColor A="255" R="255" G="255" B="255" />
                    <PrePosition X="0.8543" Y="0.5000" />
                    <PreSize X="0.2057" Y="0.4000" />
                    <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
                    <OutlineColor A="255" R="255" G="0" B="0" />
                    <ShadowColor A="255" R="110" G="110" B="110" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="175.0000" Y="37.5000" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5000" Y="0.1364" />
                <PreSize X="1.0000" Y="0.2727" />
                <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
                <TextColor A="255" R="255" G="255" B="255" />
                <DisabledFileData Type="Normal" Path="images/ui/common/btn_info_highlight.png" Plist="" />
                <PressedFileData Type="Normal" Path="images/ui/common/btn_info_highlight.png" Plist="" />
                <NormalFileData Type="Normal" Path="images/ui/common/btn_info.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position X="154.1552" Y="396.2329" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.2409" Y="0.3488" />
            <PreSize X="0.5469" Y="0.2421" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="buttonReset" ActionTag="1065021665" Tag="524" IconVisible="False" LeftMargin="170.0000" RightMargin="170.0000" TopMargin="986.0000" BottomMargin="100.0000" TouchEnable="True" FontSize="26" ButtonText="Reset Score" Scale9Enable="True" LeftEage="20" RightEage="20" TopEage="20" BottomEage="20" Scale9OriginX="20" Scale9OriginY="20" Scale9Width="10" Scale9Height="10" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="300.0000" Y="50.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="320.0000" Y="125.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.1100" />
            <PreSize X="0.4688" Y="0.0440" />
            <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
            <TextColor A="255" R="255" G="255" B="255" />
            <DisabledFileData Type="Normal" Path="images/ui/common/btn_danger_highlight.png" Plist="" />
            <PressedFileData Type="Normal" Path="images/ui/common/btn_danger_highlight.png" Plist="" />
            <NormalFileData Type="Normal" Path="images/ui/common/btn_danger.png" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>