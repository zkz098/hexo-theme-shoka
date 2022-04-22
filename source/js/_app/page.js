'use strict';
const cardActive = function () {
  if (!$('.index.wrap'))
    return

  if (!window.IntersectionObserver) {
    $.each('.index.wrap article.item, .index.wrap section.item', function (article) {
      if (article.hasClass("show") === false) {
        article.addClass("show");
      }
    })
  } else {
    const io = new IntersectionObserver(function (entries) {

      entries.forEach(function (article) {
        if (article.target.hasClass("show")) {
          io.unobserve(article.target)
        } else {
          if (article.isIntersecting || article.intersectionRatio > 0) {
            article.target.addClass("show");
            io.unobserve(article.target);
          }
        }
      })
    }, {
      root: null,
      threshold: [0.3]
    });

    $.each('.index.wrap article.item, .index.wrap section.item', function (article) {
      io.observe(article)
    })

    $('.index.wrap .item:first-child').addClass("show")
  }

  $.each('.cards .item', function (element, index) {
    ['mouseenter', 'touchstart'].forEach(function (item) {
      element.addEventListener(item, function (event) {
        if ($('.cards .item.active')) {
          $('.cards .item.active').removeClass('active')
        }
        element.addClass('active')
      })
    });
    ['mouseleave'].forEach(function (item) {
      element.addEventListener(item, function (event) {
        element.removeClass('active')
      })
    });
  });
}

const registerExtURL = function () {
  $.each('span.exturl', function (element) {
    const link = document.createElement('a');
    // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
    link.href = decodeURIComponent(atob(element.dataset.url).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    link.rel = 'noopener external nofollow noreferrer';
    link.target = '_blank';
    link.className = element.className;
    link.title = element.title || element.innerText;
    link.innerHTML = element.innerHTML;
    if (element.dataset.backgroundImage) {
      link.dataset.backgroundImage = element.dataset.backgroundImage;
    }
    element.parentNode.replaceChild(link, element);
  });
}

const postFancybox = function (p) {
  if ($(p + ' .md img')) {
    vendorCss('fancybox');
    vendorJs('fancybox', function () {
      const q = jQuery.noConflict();

      $.each(p + ' p.gallery', function (element) {
        const box = document.createElement('div');
        box.className = 'gallery';
        box.attr('data-height', element.attr('data-height') || 220);

        box.innerHTML = element.innerHTML.replace(/<br>/g, "")

        element.parentNode.insertBefore(box, element);
        element.remove();
      });

      $.each(p + ' .md img:not(.emoji):not(.vemoji)', function (element) {
        const $imageWrapLink = $image.wrap('<a class="fancybox" href="' + imageLink + '" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>').parent('a');
        const $image = q(element);
        let info, captionClass = 'image-info';
        if (!$image.is('a img')) {
          const imageLink = $image.attr('data-src') || $image.attr('src');
          $image.data('safe-src', imageLink)
          if (!$image.is('.gallery img')) {
            $imageWrapLink.attr('data-fancybox', 'default').attr('rel', 'default');
          } else {
            captionClass = 'jg-caption'
          }
        }
        if (info = element.attr('title')) {
          $imageWrapLink.attr('data-caption', info);
          const para = document.createElement('span');
          const txt = document.createTextNode(info);
          para.appendChild(txt);
          para.addClass(captionClass);
          element.insertAfter(para);
        }
      });

      $.each(p + ' div.gallery', function (el, i) {
        q(el).justifiedGallery({
          rowHeight: q(el).data('height') || 120,
          rel: 'gallery-' + i
        }).on('jg.complete', function () {
          q(this).find('a').each(function (k, ele) {
            ele.attr('data-fancybox', 'gallery-' + i);
          });
        });
      });

      q.fancybox.defaults.hash = false;
      q(p + ' .fancybox').fancybox({
        loop: true,
        helpers: {
          overlay: {
            locked: false
          }
        }
      });
    }, window.jQuery);
  }
}

const postBeauty = function () {
  loadComments();

  if (!$('.md'))
    return

  postFancybox('.post.block');

  $('.post.block').oncopy = function (event) {
    showtip(LOCAL.copyright)

    if (LOCAL.nocopy) {
      event.preventDefault()
      return
    }

    const copyright = $('#copyright');
    if (window.getSelection().toString().length > 30 && copyright) {
      event.preventDefault();
      const author = "# " + copyright.child('.author').innerText;
      const link = "# " + copyright.child('.link').innerText;
      const license = "# " + copyright.child('.license').innerText;
      const htmlData = author + "<br>" + link + "<br>" + license + "<br><br>" + window.getSelection().toString().replace(/\r\n/g, "<br>");
      const textData = author + "\n" + link + "\n" + license + "\n\n" + window.getSelection().toString().replace(/\r\n/g, "\n");
      if (event.clipboardData) {
        event.clipboardData.setData("text/html", htmlData);
        event.clipboardData.setData("text/plain", textData);
      } else if (window.clipboardData) {
        return window.clipboardData.setData("text", textData);
      }
    }
  }

  $.each('li ruby', function (element) {
    let parent = element.parentNode;
    if (element.parentNode.tagName !== 'LI') {
      parent = element.parentNode.parentNode;
    }
    parent.addClass('ruby');
  })

  $.each('ol[start]', function (element) {
    element.style.counterReset = "counter " + parseInt(element.attr('start') - 1)
  })

  $.each('.md table', function (element) {
    element.wrap({
      className: 'table-container'
    });
  });

  $.each('.highlight > .table-container', function (element) {
    element.className = 'code-container'
  });

  $.each('figure.highlight', function (element) {

    const hideCode = function () {
      code_container.style.maxHeight = "300px"
      showBtn.removeClass('open')
    };
    const showCode = function () {
      code_container.style.maxHeight = ""
      showBtn.addClass('open')
    };
    const code_container = element.child('.code-container');
    const caption = element.child('figcaption');

    element.insertAdjacentHTML('beforeend', '<div class="operation"><span class="breakline-btn"><i class="ic i-align-left"></i></span><span class="copy-btn"><i class="ic i-clipboard"></i></span><span class="fullscreen-btn"><i class="ic i-expand"></i></span></div>');

    const copyBtn = element.child('.copy-btn');
    if (LOCAL.nocopy) {
      copyBtn.remove()
    } else {
      copyBtn.addEventListener('click', function (event) {
        const target = event.currentTarget;
        let comma = '', code = '';
        code_container.find('pre').forEach(function (line) {
          code += comma + line.innerText;
          comma = '\n'
        })

        clipBoard(code, function (result) {
          target.child('.ic').className = result ? 'ic i-check' : 'ic i-times';
          target.blur();
          showtip(LOCAL.copyright);
        })
      });
      copyBtn.addEventListener('mouseleave', function (event) {
        setTimeout(function () {
          event.target.child('.ic').className = 'ic i-clipboard';
        }, 1000);
      });
    }

    const breakBtn = element.child('.breakline-btn');
    breakBtn.addEventListener('click', function (event) {
      const target = event.currentTarget;
      if (element.hasClass('breakline')) {
        element.removeClass('breakline');
        target.child('.ic').className = 'ic i-align-left';
      } else {
        element.addClass('breakline');
        target.child('.ic').className = 'ic i-align-justify';
      }
    });

    const fullscreenBtn = element.child('.fullscreen-btn');
    const removeFullscreen = function () {
      element.removeClass('fullscreen');
      element.scrollTop = 0;
      BODY.removeClass('fullscreen');
      fullscreenBtn.child('.ic').className = 'ic i-expand';
    };
    const fullscreenHandle = function (event) {
      const target = event.currentTarget;
      if (element.hasClass('fullscreen')) {
        removeFullscreen();
        hideCode && hideCode();
        pageScroll(element)
      } else {
        element.addClass('fullscreen');
        BODY.addClass('fullscreen');
        fullscreenBtn.child('.ic').className = 'ic i-compress';
        showCode && showCode();
      }
    };
    fullscreenBtn.addEventListener('click', fullscreenHandle);
    caption && caption.addEventListener('click', fullscreenHandle);

    if (code_container && code_container.find("tr").length > 15) {

      code_container.style.maxHeight = "300px";
      code_container.insertAdjacentHTML('beforeend', '<div class="show-btn"><i class="ic i-angle-down"></i></div>');
      const showBtn = code_container.child('.show-btn');


      showBtn.addEventListener('click', function (event) {
        if (showBtn.hasClass('open')) {
          removeFullscreen()
          hideCode()
          pageScroll(code_container)
        } else {
          showCode()
        }
      });
    }
  });

  $.each('pre.mermaid > svg', function (element) {
    element.style.maxWidth = ''
  });

  $.each('.reward button', function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      const qr = $('#qr');
      if (qr.display() === 'inline-flex') {
        transition(qr, 0)
      } else {
        transition(qr, 1, function () {
          qr.display('inline-flex')
        }) // slideUpBigIn
      }
    });
  });

  //quiz
  $.each('.quiz > ul.options li', function (element) {
    element.addEventListener('click', function (event) {
      if (element.hasClass('correct')) {
        element.toggleClass('right')
        element.parentNode.parentNode.addClass('show')
      } else {
        element.toggleClass('wrong')
      }
    });
  });

  $.each('.quiz > p', function (element) {
    element.addEventListener('click', function (event) {
      element.parentNode.toggleClass('show')
    });
  });

  $.each('.quiz > p:first-child', function (element) {
    const quiz = element.parentNode;
    let type = 'choice';
    if (quiz.hasClass('true') || quiz.hasClass('false'))
      type = 'true_false'
    if (quiz.hasClass('multi'))
      type = 'multiple'
    if (quiz.hasClass('fill'))
      type = 'gap_fill'
    if (quiz.hasClass('essay'))
      type = 'essay'
    element.attr('data-type', LOCAL.quiz[type])
  });

  $.each('.quiz .mistake', function (element) {
    element.attr('data-type', LOCAL.quiz.mistake)
  });

  $.each('div.tags a', function (element) {
    element.className = ['primary', 'success', 'info', 'warning', 'danger'][Math.floor(Math.random() * 5)]
  })

  $.each('.md div.player', function (element) {
    mediaPlayer(element, {
      type: element.attr('data-type'),
      mode: 'order',
      btns: []
    }).player.load(JSON.parse(element.attr('data-src'))).fetch()
  })
}

const tabFormat = function () {
  // tab
  let first_tab;
  $.each('div.tab', function (element, index) {
    if (element.attr('data-ready'))
      return

    const id = element.attr('data-id');
    const title = element.attr('data-title');
    let box = $('#' + id);
    if (!box) {
      box = document.createElement('div');
      box.className = 'tabs';
      box.id = id;
      box.innerHTML = '<div class="show-btn"></div>'

      const showBtn = box.child('.show-btn');
      showBtn.addEventListener('click', function (event) {
        pageScroll(box)
      });

      element.parentNode.insertBefore(box, element);
      first_tab = true;
    } else {
      first_tab = false;
    }

    let ul = box.child('.nav ul');
    if (!ul) {
      ul = box.createChild('div', {
        className: 'nav',
        innerHTML: '<ul></ul>'
      }).child('ul');
    }

    const li = ul.createChild('li', {
      innerHTML: title
    });

    if (first_tab) {
      li.addClass('active');
      element.addClass('active');
    }

    li.addEventListener('click', function (event) {
      const target = event.currentTarget;
      box.find('.active').forEach(function (el) {
        el.removeClass('active');
      })
      element.addClass('active');
      target.addClass('active');
    });

    box.appendChild(element);
    element.attr('data-ready', true)
  });
}

const loadComments = function () {
  const element = $('#comments');
  if (!element) {
    goToComment.display("none")
    return;
  } else {
    goToComment.display("")
  }

  if (!window.IntersectionObserver) {
    vendorCss('valine');
  } else {
    const io = new IntersectionObserver(function (entries, observer) {
      const entry = entries[0];
      vendorCss('valine');
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        transition($('#comments'), 'bounceUpIn');
        observer.disconnect();
      }
    });

    io.observe(element);
  }
}

const algoliaSearch = function (pjax) {
  if (CONFIG.search === null)
    return

  if (!siteSearch) {
    siteSearch = BODY.createChild('div', {
      id: 'search',
      innerHTML: '<div class="inner"><div class="header"><span class="icon"><i class="ic i-search"></i></span><div class="search-input-container"></div><span class="close-btn"><i class="ic i-times-circle"></i></span></div><div class="results"><div class="inner"><div id="search-stats"></div><div id="search-hits"></div><div id="search-pagination"></div></div></div></div>'
    });
  }

  const search = instantsearch({
    indexName: CONFIG.search.indexName,
    searchClient: algoliasearch(CONFIG.search.appID, CONFIG.search.apiKey),
    searchFunction: function (helper) {
      const searchInput = $('.search-input');
      if (searchInput.value) {
        helper.search();
      }
    }
  });

  search.on('render', function () {
    pjax.refresh($('#search-hits'));
  });

  // Registering Widgets
  search.addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: CONFIG.search.hits.per_page || 10
    }),

    instantsearch.widgets.searchBox({
      container: '.search-input-container',
      placeholder: LOCAL.search.placeholder,
      // Hide default icons of algolia search
      showReset: false,
      showSubmit: false,
      showLoadingIndicator: false,
      cssClasses: {
        input: 'search-input'
      }
    }),

    instantsearch.widgets.stats({
      container: '#search-stats',
      templates: {
        text: function (data) {
          const stats = LOCAL.search.stats
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS);
          return stats + '<span class="algolia-powered"></span><hr>';
        }
      }
    }),

    instantsearch.widgets.hits({
      container: '#search-hits',
      templates: {
        item: function (data) {
          const cats = data.categories ? '<span>' + data.categories.join('<i class="ic i-angle-right"></i>') + '</span>' : '';
          return '<a href="' + CONFIG.root + data.path + '">' + cats + data._highlightResult.title.value + '</a>';
        },
        empty: function (data) {
          return '<div id="hits-empty">' +
            LOCAL.search.empty.replace(/\$\{query}/, data.query) +
            '</div>';
        }
      },
      cssClasses: {
        item: 'item'
      }
    }),

    instantsearch.widgets.pagination({
      container: '#search-pagination',
      scrollTo: false,
      showFirst: false,
      showLast: false,
      templates: {
        first: '<i class="ic i-angle-double-left"></i>',
        last: '<i class="ic i-angle-double-right"></i>',
        previous: '<i class="ic i-angle-left"></i>',
        next: '<i class="ic i-angle-right"></i>'
      },
      cssClasses: {
        root: 'pagination',
        item: 'pagination-item',
        link: 'page-number',
        selectedItem: 'current',
        disabledItem: 'disabled-item'
      }
    })
  ]);

  search.start();

  // Handle and trigger popup window
  $.each('.search', function (element) {
    element.addEventListener('click', function () {
      document.body.style.overflow = 'hidden';
      transition(siteSearch, 'shrinkIn', function () {
        $('.search-input').focus();
      }) // transition.shrinkIn
    });
  });

  // Monitor main search box
  const onPopupClose = function () {
    document.body.style.overflow = '';
    transition(siteSearch, 0); // "transition.shrinkOut"
  };

  siteSearch.addEventListener('click', function (event) {
    if (event.target === siteSearch) {
      onPopupClose();
    }
  });
  $('.close-btn').addEventListener('click', onPopupClose);
  window.addEventListener('pjax:success', onPopupClose);
  window.addEventListener('keyup', function (event) {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
}
