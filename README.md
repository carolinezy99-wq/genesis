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

页面默认英文，右上角可切到中文。利率、姓名和目标写在 `src/lib/banks.ts`，于 2026-09-26 核读，不是请求时抓取。每条来源标了类型：官网、统计机构或媒体。新加坡汇率带的调整幅度没有官方基点，卡片同时链到《商业时报》的同日报道。

这是普通的 Next.js 网站，用系统浏览器打开，不依赖 Cursor 桌面。

```bash
npm run build
npm start
```

生产服务同样在 http://127.0.0.1:43127 。要给别人一个外网地址，在本机再跑一条隧道，例如 `cloudflared tunnel --url http://127.0.0.1:43127`。

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
