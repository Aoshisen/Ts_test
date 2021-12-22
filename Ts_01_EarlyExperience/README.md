---

title:"学习ts的准备工作"
date: 2021-12-10

---

## 学习ts的准备工作

### 安装typescript支持

```bash
 #安装tyescrit
 npm install typescript -g
 #验证typescrit是否安装成功
 tsc -v
 #我试过用yarn 安装tylpescript 但是系统报找不到tsc命令，大概的猜想是yarn的包安装路径没有映射到系统的环境变量里面，所以这里需要用npm安装包
```

### 新建文件并使用tsc命令编译，编译之后再通过node环境运行js代码

```bash
 #建立文件
 touch index.ts 
 #简单的在文件里面写一些内容
 echo '
 let str:string ="Aoshisen"
 console.log(str) 
 ' >> index.ts
 # 通过typescript编译.ts文件
 tsc index.ts
 #通过node运行 编译得到的.js文件
 node index.js
```

或许可以再简单一点 使用ts-node 来编译并运行.ts 文件

```bash
#全局安装ts-node依赖
 npm install ts-node -g
#编译并运行.ts文件
 ts-node index.ts
 #但是这里运行不成功，冲浪的时候发现了是自己的ts-node版本太新了
 
 #查看ts-node版本 v10.4.0
 ts-node -v 

 # 全局卸载ts-node
 npm uninstall -g ts-node

 # 安装指定低版本的 ts-node 值得注意的是在windows 里面全局安装了的包在WSL子系统里面也可以用，就很棒
 npm install -g ts-node@8.5.4

 #重试一下
 ts-node index.ts 
 
```

### 遇到的一些问题

在运行了上面的代码过后，就会在同级目录下生成同名的.js文件(tsc XXX 会，ts-node XXX不会)

```bash
  # 复现步骤，在编辑器里面同时打开.js 和.ts 文件 会飘红,提示已经声明了a
  # 原因是ts 的模块化方案和js的模块化方案不一样，js是一个文件一个模块，而ts不是
  # 解决方法： 在.ts文件头部 加入export 关键字 但是对应的运行tsc 后的.js文件也会变化
```

### 使用一些命令来改变默认的配置

```bash
# --outdir 指定编译后的文件的输出路径 为./dist
tsc --outdir ./dist index.ts

# --target 指定编译的代码的版本目标，默认为ES3
tsc --target ES6 index.ts

# --watch 在监听模式下运行,当文件发生改变的时候自动编译
tsc --outdir ./dist --target ES6 --watch index.ts

```

但是每一次运行都要写这么一大堆的配置就很麻烦，效率低下的同时也很容易出错，所以提供了一个tsconfig.json 文件 在用户运行tsc命令的时候自动加载这个文件里面的配置项来编译文件,大概如下所示：

```json
{
    "compilerOptions": {
        "outDir": "./dist",
        "target": "ES2015",
    "watch": true,
},
// ** : 所有目录(包括子目录)
// * : 所有文件，也可以指定类型 *.ts "include": ["./src/**/*"]
}
```

当然也可以指定加载不同的编译配置文件

```bash
 # 使用 --project 或 -p 指定配置文件目录，会默认加载该目录下的 tsconfig.json 文件
 tsc -p ./configs
 
 # 也可以具体指定某个具体的配置文件
 tsc -p ./configs/ts.json

```

### 一些骚操作

```bash
 # 用 tsc --watch --target ./dist index.ts 动态的监听.ts文件的改变然后动态的输出文件到 ./dist 目录下面
 # 然后再用nodemon 动态的运行 ./dist/index.js 文件  这样就可以做到在编辑器里面改写了代码，立即就能运行

```
