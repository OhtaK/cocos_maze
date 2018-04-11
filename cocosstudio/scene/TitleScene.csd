<GameFile>
  <PropertyGroup Name="TitleScene" Type="Scene" ID="97369df2-cf03-464a-b254-04345db69d20" Version="3.10.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="120" Speed="1.0000">
        <Timeline ActionTag="789315359" Property="Position">
          <PointFrame FrameIndex="0" X="320.0000" Y="346.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="60" X="320.0000" Y="346.0000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="120" X="320.0000" Y="346.0000">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="789315359" Property="Scale">
          <ScaleFrame FrameIndex="0" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="60" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="120" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="789315359" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="60" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="120" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="789315359" Property="Alpha">
          <IntFrame FrameIndex="0" Value="255">
            <EasingData Type="0" />
          </IntFrame>
          <IntFrame FrameIndex="60" Value="63">
            <EasingData Type="0" />
          </IntFrame>
          <IntFrame FrameIndex="120" Value="255">
            <EasingData Type="0" />
          </IntFrame>
        </Timeline>
        <Timeline ActionTag="-559020844" Property="Position">
          <PointFrame FrameIndex="0" X="320.0000" Y="891.5000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="30" X="320.0000" Y="911.5000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="60" X="320.0000" Y="891.5000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="90" X="320.0000" Y="871.5000">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="120" X="320.0000" Y="891.5000">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="-559020844" Property="Scale">
          <ScaleFrame FrameIndex="0" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-559020844" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
      </Animation>
      <AnimationList>
        <AnimationInfo Name="wait" StartIndex="0" EndIndex="120">
          <RenderColor A="255" R="70" G="130" B="180" />
        </AnimationInfo>
      </AnimationList>
      <ObjectData Name="Scene" Tag="110" ctype="GameNodeObjectData">
        <Size X="640.0000" Y="1136.0000" />
        <Children>
          <AbstractNodeData Name="spriteBg" ActionTag="1147675195" Tag="11" IconVisible="False" ctype="SpriteObjectData">
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
          <AbstractNodeData Name="buttonStart" ActionTag="789315359" Tag="118" IconVisible="False" VerticalEdge="BottomEdge" LeftMargin="170.0000" RightMargin="170.0000" TopMargin="740.0000" BottomMargin="296.0000" TouchEnable="True" FontSize="40" ButtonText="START" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="20" Scale9Height="29" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
            <Size X="300.0000" Y="100.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="320.0000" Y="346.0000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.3046" />
            <PreSize X="0.4688" Y="0.0880" />
            <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
            <TextColor A="255" R="255" G="255" B="255" />
            <DisabledFileData Type="Normal" Path="images/ui/common/btn_info_highlight.png" Plist="" />
            <PressedFileData Type="Normal" Path="images/ui/common/btn_info_highlight.png" Plist="" />
            <NormalFileData Type="Normal" Path="images/ui/common/btn_info.png" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
          <AbstractNodeData Name="labelTitle" ActionTag="-559020844" Tag="126" IconVisible="False" LeftMargin="20.0000" RightMargin="20.0000" TopMargin="200.0000" BottomMargin="847.0000" IsCustomSize="True" FontSize="80" LabelText="げーむたいとる" HorizontalAlignmentType="HT_Center" VerticalAlignmentType="VT_Center" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="TextObjectData">
            <Size X="600.0000" Y="89.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="320.0000" Y="891.5000" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5000" Y="0.7848" />
            <PreSize X="0.9375" Y="0.0783" />
            <FontResource Type="Normal" Path="font/rounded-x-mplus-1c-heavy.ttf" Plist="" />
            <OutlineColor A="255" R="255" G="0" B="0" />
            <ShadowColor A="255" R="110" G="110" B="110" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>