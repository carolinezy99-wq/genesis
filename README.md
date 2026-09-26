# 全球央行货币政策 / Global central bank policy

九家央行的政策对照：负责人与官方肖像、决策机构、通胀目标、当前政策水平，以及最近一次决定是收紧、维持还是放松。

Nine central banks side by side: the person in charge, the deciding committee, the inflation target, the current setting, and whether the latest decision tightened, held, or eased.

默认英文，右上角切到中文。数字写在 `src/lib/banks.ts`，于 2026-09-26 从官方页面核读，打开页面时不会重新抓取。

The page opens in English. Use the control at the top right for Chinese. Figures live in `src/lib/banks.ts` and were read from official pages on 2026-09-26. The site does not fetch them again when you open it.

需要 Node.js 20 或更新版本。先进入本项目目录，再执行下面的命令。

You need Node.js 20 or newer. Open a terminal in this project folder, then paste the commands below.

## 在你自己的电脑上长期查看 / Run it on your own computer

这是长期可用的方式：网站跑在你这台电脑上，用这台电脑的浏览器打开。

This is the durable way to view it. The site runs on your computer, and you open it in a browser on that same computer.

```bash
npm install
npm run build
npm start -- --hostname 0.0.0.0 --port 43127
```

只执行 `npm start` 也可以。项目脚本里已经写了主机 `0.0.0.0` 和端口 `43127`。

`npm start` alone also works. The project script already sets hostname `0.0.0.0` and port `43127`.

然后在**正在运行这些命令的那台电脑**上打开：

Then, on the computer where those commands are running, open:

http://127.0.0.1:43127

`127.0.0.1` 只指向你自己这台机器。换一台电脑、手机，或把这个地址发给别人，都打不开。别人的 `127.0.0.1` 是他们自己的电脑，不是你的。

`127.0.0.1` means “this computer only.” It will not open from another computer or phone. Their `127.0.0.1` is their machine, not yours.

同一家里的另一台设备，可以用运行命令的那台电脑的局域网地址，例如 `http://192.168.1.20:43127`。地址以那台电脑的实际 IP 为准，端口仍是 `43127`。不在同一网络时，这个地址同样无效。

A second device on the same home network can use the LAN address of the computer running the server, for example `http://192.168.1.20:43127`. Use that computer’s real IP. The port stays `43127`. This does not work from outside that network.

停掉网站：在运行 `npm start` 的终端按 `Ctrl+C`。

Stop the site with `Ctrl+C` in the terminal that is running `npm start`.

## 开发时改代码 / While editing

```bash
npm install
npm run dev
```

同样在本机打开 http://127.0.0.1:43127 。改完后可用：

Open http://127.0.0.1:43127 on that same computer. To check the project:

```bash
npm run lint
npm run build
```

临时的外网链接（例如 trycloudflare）没有长期保证，关掉终端或过一段时间就会失效。它不能代替在你自己电脑上运行。

A temporary public link, such as a trycloudflare URL, is not a permanent host. It stops when the tunnel stops. Run the commands above on your own computer if you want to keep the site.
