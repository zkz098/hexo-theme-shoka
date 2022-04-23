# Hexo Theme Shoka

## Usage

1. Clone this repository

``` bash
# cd your-blog
git clone https://github.com/amehime/hexo-theme-shoka.git ./themes/shoka
```

2. Make changes to the root `_config.yml`
  - update `theme` fragment as `shoka`.  

3. Install the necessary plugins
  - [hexo-renderer-multi-markdown-it](https://www.npmjs.com/package/hexo-renderer-multi-markdown-it)
  - [hexo-autoprefixer](https://www.npmjs.com/package/hexo-autoprefixer)
  - [hexo-algoliasearch](https://www.npmjs.com/package/hexo-algoliasearch)
  - [hexo-symbols-count-time](https://www.npmjs.com/package/hexo-symbols-count-time)
  - [hexo-feed](https://www.npmjs.com/package/hexo-feed)

4. View a site configuration example in the `example` folder.

5. [中文使用说明](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)

# twikoo支持
**此主题仅供私用,需twikoo支持可参考代码**
这个分支添加了对twikoo评论系统的支持
在主题_config.yml中添加如下内容:
```yaml
twikoo:
  enable: true
  mode: vercel # vercel或tencent
  envId: "https://xxx.vercel.app" # twikoo环境ID,vercel填地址
  region: "none" #tencent填对应ap地域,vercel随便填
```
就可以启用twikoo了
twikoo支持改动的文件(模板):
```text
layout/_macro/comment.njk
layout/_partials/post/footer.njk
layout/_macro/widgets.njk
```
pjax问题的解决:
```text
scripts/helpers/asset.js
scripts\generaters\script.js
```
目前的改动:
- 可以自定义404页
- 导航栏毛玻璃
- twikoo提供的阅读量统计
- 友链快捷方式(需手写代码)~~懒得搞最新评论~~
