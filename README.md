# 全球央行货币政策

对照九家央行的政策立场：负责人与官方肖像、决策机构、关注的通胀指标、通胀目标、政策工具的当前水平，以及最近一次决定是加息、维持、降息还是汇率带收紧。

涵盖机构：

- 美国联邦储备系统（Federal Reserve）
- 欧洲中央银行（European Central Bank）。德国、法国、意大利由欧央行代表，不单列政策利率。
- 英格兰银行（Bank of England）
- 日本银行（Bank of Japan）
- 加拿大银行（Bank of Canada）
- 中国人民银行（People's Bank of China），官网为 pbc.gov.cn
- 印度储备银行（Reserve Bank of India）
- 新加坡金融管理局（Monetary Authority of Singapore）。工具是新元名义有效汇率政策带，图中不按政策利率绘制。
- 澳大利亚储备银行（Reserve Bank of Australia）

利率、姓名和目标写在 `src/lib/banks.ts`，来自 2026-09-26 当天打开的官方页面，不是请求时抓取。每张卡片有来源链接。

## 本地运行

```bash
npm install
npm run dev
```

开发服务器监听 `0.0.0.0:43127`。浏览器打开 http://127.0.0.1:43127 。

```bash
npm run lint
npm run build
```
