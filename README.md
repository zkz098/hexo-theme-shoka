# Hexo Theme Shoka

主要配置遵循shoka官方即可,下面为特色配置:

## twikoo
在_config增加如下配置:
```yaml
twikoo:
  enable: true 
  mode: vercel # vercel或tencent
  envId: "<twikoo-id>" # twikoo环境ID,vercel填地址
  region: "none" # vercel随便填,tencent填环境地区
```

## advVendors加载:
推荐配置:
```yaml
advVendors:
  enable: true
  github: "https://fastly.jsdelivr.net/gh/"
  combine: "https://fastly.jsdelivr.net/"
  npm: "https://npm.elemecdn.com/"
  js:
    pace:
      src: https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/pace/1.0.2/pace.min.js
    pjax:
      src: npm/pjax@0.2.8/pjax.min.js
    fetch:
      src: npm/whatwg-fetch@3.4.0/dist/fetch.umd.js
    anime:
      src: https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/animejs/3.2.0/anime.min.js
    algolia:
      src: https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/algoliasearch/4.12.1/algoliasearch-lite.umd.min.js
    instantsearch:
      src: https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/instantsearch.js/4.39.0/instantsearch.production.min.js
    lazyload:
      src: https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/lozad.js/1.16.0/lozad.min.js
    quicklink:
      src: https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/quicklink/2.2.0/quicklink.umd.min.js
    fancybox:
      src: https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/??jquery/3.5.1/jquery.min.js,fancybox/3.5.7/jquery.fancybox.min.js,justifiedGallery/3.8.1/js/jquery.justifiedGallery.min.js
      async: true
    copy_tex:
      src: https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/KaTeX/0.12.0/contrib/copy-tex.min.js
      async: true
    chart:
      src: npm/frappe-charts@1.5.0/dist/frappe-charts.min.iife.js

vendorsList:
  js:
    - pace
    - pjax
    - fetch
    - anime
    - algolia
    - instantsearch
    - lazyload
    - quicklink
    - fancybox
    - copy_tex
    - chart
```
格式如下:
```yaml
advVendors:   
  enable: true # 是否启用高级加载
  github: "https://fastly.jsdelivr.net/gh/" # github资源CDN
  combine: "https://fastly.jsdelivr.net/"   # 聚合资源CDN(不推荐)
  npm: "https://npm.elemecdn.com/"    # npm资源CDN
  js:
    packageName: # 需要和vendorsList一致
      src: npm/pjax@0.2.8/pjax.min.js # 资源地址,具体说明见下方
      async: true # 是否开启异步加载
      data-pjax: true # 开启data-pjax功能

vendorsList:
  - packageName
```
src地址分4种:
- npm地址,格式: `npm/package@version/file`
- github地址,格式同jsdelivr
- combine地址,格式同jsdelivr(建议使用字节公共库聚合替代)
- http地址,直接填入链接即可
