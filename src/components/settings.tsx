import React from "react";
import { useState, useCallback } from "react";
import { IconButton } from "./iconButton";
import { TextButton } from "./textButton";
import { Message } from "@/features/messages/messages";
import {
  KoeiroParam,
  PRESET_A,
  PRESET_B,
  PRESET_C,
  PRESET_D,
} from "@/features/constants/koeiroParam";
import { Link } from "./link";

type Props = {
  openAiKey: string;
  azureOpenAiKey: string;
  azureOpenAiResourceName: string;
  azureOpenAiDeploymentName: string;
  systemPrompt: string;
  chatLog: Message[];
  koeiroParam: KoeiroParam;
  onClickClose: () => void;
  onChangeAiKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAzureOpenAiKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAzureOpenAiResourceName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAzureOpenAiDeploymentName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeKoeiroParam: (x: number, y: number) => void;
  onClickOpenVrmFile: () => void;
};
export const Settings = ({
  openAiKey,
  azureOpenAiKey,
  azureOpenAiResourceName,
  azureOpenAiDeploymentName,
  chatLog,
  systemPrompt,
  koeiroParam,
  onClickClose,
  onChangeSystemPrompt,
  onChangeAiKey,
  onChangeAzureOpenAiKey,
  onChangeAzureOpenAiResourceName,
  onChangeAzureOpenAiDeploymentName,
  onChangeChatLog,
  onChangeKoeiroParam,
  onClickOpenVrmFile,
}: Props) => {
  const [provider, setProvider] = useState("openai");
  const handleProviderChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setProvider(event.target.value);
  }, []);
  return (
    <div className="absolute z-40 w-full h-full bg-white/80 backdrop-blur ">
      <div className="absolute m-24">
        <IconButton
          iconName="24/Close"
          isProcessing={false}
          onClick={onClickClose}
        ></IconButton>
      </div>
      <div className="max-h-full overflow-auto">
        <div className="text-text1 max-w-3xl mx-auto px-24 py-64 ">
          <div className="my-24 typography-32 font-bold">設定</div>
          <div className="my-24">
            <div className="my-16 typography-20 font-bold">
              ChatGPT APIキー
            </div>
            <div className="mt-16">プロバイダー</div>
            <select
              value={provider}
              onChange={handleProviderChange}
              className="text-ellipsis px-16 py-8 w-1/2 bg-surface1 hover:bg-surface1-hover rounded-8"
            >
              <option value="openai">OpenAI</option>
              <option value="azure_openai">Azure OpenAI Service</option>
            </select>
            {provider === "openai" ? (
            <div className="my-8">
              <div className="mt-16">
                APIキー
              </div>
              <input
                type="text"
                placeholder="sk-..."
                value={openAiKey}
                onChange={onChangeAiKey}
                className="text-ellipsis px-16 py-8 w-full bg-surface1 hover:bg-surface1-hover rounded-8"
              />
              <div className="my-16">
                APIキーは
                <Link
                  url="https://platform.openai.com/account/api-keys"
                  label="OpenAIのサイト"
                />
                で取得できます。取得したAPIキーをフォームに入力してください。
              </div>
              <div className="my-16">
                入力されたAPIキーで、ブラウザから直接OpenAIのAPIを利用しますので、サーバー等には保存されません。
                なお、利用しているモデルはGPT-3です。
                <br />
                ※APIキーや会話文はピクシブのサーバーに送信されません。
              </div>
            </div>
            ) : (
              <>
                <div className="my-8">
                  <div className="mt-16">
                    APIキー
                  </div>
                  <input
                    type="text"
                    placeholder="YOUR_API_KEY"
                    value={azureOpenAiKey}
                    onChange={onChangeAzureOpenAiKey}
                    className="text-ellipsis px-16 py-8 w-full bg-surface1 hover:bg-surface1-hover rounded-8"
                  />
                </div>
                <div className="my-8">
                  <div className="mt-16">
                    リソース名
                  </div>
                  <input
                    type="text"
                    placeholder="YOUR_RESOURCE_NAME"
                    value={azureOpenAiResourceName}
                    onChange={onChangeAzureOpenAiResourceName}
                    className="text-ellipsis px-16 py-8 w-full bg-surface1 hover:bg-surface1-hover rounded-8"
                  />
                </div>
                <div className="my-8">
                  <div className="mt-16">
                    モデルのデプロイ名
                  </div>
                  <input
                    type="text"
                    placeholder="YOUR_DEPLOYMENT_NAME"
                    value={azureOpenAiDeploymentName}
                    onChange={onChangeAzureOpenAiDeploymentName}
                    className="text-ellipsis px-16 py-8 w-full bg-surface1 hover:bg-surface1-hover rounded-8"
                  />
                </div>
                <div className="my-16">
                  <Link
                    url="https://learn.microsoft.com/ja-jp/azure/cognitive-services/openai/reference"
                    label="Azure OpenAI ServiceのREST APIリファレンス"
                  />
                  を参考にして各項目を入力してください。
                </div>
                <div className="my-16">
                  入力されたAPIキーで、ブラウザから直接Azure OpenAI ServiceのAPIを利用しますので、サーバー等には保存されません。
                  <br />
                  ※APIキーや会話文はピクシブのサーバーに送信されません。
                </div>
              </>
            )}
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">
              キャラクターモデル
            </div>
            <div className="my-8">
              <TextButton onClick={onClickOpenVrmFile}>VRMを開く</TextButton>
            </div>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">
              キャラクター設定（システムプロンプト）
            </div>

            <textarea
              value={systemPrompt}
              onChange={onChangeSystemPrompt}
              className="px-16 py-8  bg-surface1 hover:bg-surface1-hover h-168 rounded-8 w-full"
            ></textarea>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">声の調整</div>
            <div>
              Koeiro APIを使用しています。詳しくは
              <a
                className="text-primary hover:text-primary-hover"
                target="_blank"
                rel="noopener noreferrer"
                href="http://koeiromap.rinna.jp"
              >
                http://koeiromap.rinna.jp
              </a>
              をご覧ください。
            </div>
            <div className="mt-16">プリセット</div>
            <div className="my-8 grid grid-cols-2 gap-[8px]">
              <TextButton
                onClick={() =>
                  onChangeKoeiroParam(PRESET_A.speakerX, PRESET_A.speakerY)
                }
              >
                かわいい
              </TextButton>
              <TextButton
                onClick={() =>
                  onChangeKoeiroParam(PRESET_B.speakerX, PRESET_B.speakerY)
                }
              >
                元気
              </TextButton>
              <TextButton
                onClick={() =>
                  onChangeKoeiroParam(PRESET_C.speakerX, PRESET_C.speakerY)
                }
              >
                かっこいい
              </TextButton>
              <TextButton
                onClick={() =>
                  onChangeKoeiroParam(PRESET_D.speakerX, PRESET_D.speakerY)
                }
              >
                渋い
              </TextButton>
            </div>
            <div className="my-24">
              <div className="select-none">x : {koeiroParam.speakerX}</div>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.001}
                value={koeiroParam.speakerX}
                className="mt-8 mb-16 input-range"
                onChange={(e) => {
                  onChangeKoeiroParam(
                    Number(e.target.value),
                    koeiroParam.speakerY
                  );
                }}
              ></input>
              <div className="select-none">y : {koeiroParam.speakerY}</div>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.001}
                value={koeiroParam.speakerY}
                className="mt-8 mb-16 input-range"
                onChange={(e) => {
                  onChangeKoeiroParam(
                    koeiroParam.speakerX,
                    Number(e.target.value)
                  );
                }}
              ></input>
            </div>
          </div>
          {chatLog.length > 0 && (
            <div className="my-40">
              <div className="my-16 typography-20 font-bold">会話履歴</div>
              <div className="my-8">
                {chatLog.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="my-8 grid grid-flow-col  grid-cols-[min-content_1fr] gap-x-fixed"
                    >
                      <div className="w-[64px] py-8">
                        {value.role === "assistant" ? "Character" : "You"}
                      </div>
                      <input
                        key={index}
                        className="bg-surface1 hover:bg-surface1-hover rounded-8 w-full px-16 py-8"
                        type="text"
                        value={value.content}
                        onChange={(event) => {
                          onChangeChatLog(index, event.target.value);
                        }}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
