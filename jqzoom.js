/*!
 * 放大镜插件
 * 1. 需要通过样式定义放大镜盒子
 * 2. 放大镜类名为 .zoomdiv 样式定位
 * 3. 小放大镜类名为 .jqZoomPup
 * 4. 图片需要加 类名 .zoom-img
 */

(function($, win) {
    $.fn.jqzoom = function(options) {
        var settings = {
            width: 300, //放大镜的大小
            height: 300,
            pupshow: true,
        };

        if (options) {
            $.extend(settings, options);
        }

        // 全局变量
        var self = $(this);
        var pup, zoom;
        var boxTop = self.offset().top;
        var boxLeft = self.offset().left;
        var boxWidth = self.width();
        var boxHeight = self.height();
        // 小图和大图的比例
        var scaleX, scaleY;

        // 初始化
        var init = function() {
            var imgSrc = self.find('.zoom-img').attr('src');
            self.append('<div class="jqZoomPup"></div>');
            self.after('<div class="zoomdiv"><img src="' + imgSrc + '"></div>');
            pup = $('.jqZoomPup');
            zoom = $('.zoomdiv');
            zoom.width(settings.width);
            zoom.height(settings.height);
        }
        var show = function() {
            // 先切换图片
            var imgSrc = self.find('.zoom-img').attr('src');
            zoom.find('img').attr('src', imgSrc);

            scaleX = zoom.find('img').width() / boxWidth;
            scaleY = zoom.find('img').height() / boxHeight;
            pup.width(settings.width / scaleX);
            pup.height(settings.height / scaleY);
            pup.show();
            zoom.addClass('show');
        }
        var hide = function() {
            pup.hide();
            zoom.removeClass('show');
        }
        var move = function(e) {
            var maxPosY = boxHeight - pup.height();
            var maxPosX = boxWidth - pup.width();
            var pageX = e.pageX;
            var pageY = e.pageY;
            var posY = pageY - boxTop - pup.height() / 2;
            var posX = pageX - boxLeft - pup.width() / 2;

            if (posY <= 0) {
                posY = 0;
            } else if (posY >= maxPosY) {
                posY = maxPosY;
            }

            if (posX <= 0) {
                posX = 0;
            } else if (posX >= maxPosX) {
                posX = maxPosX;
            }

            pup.css({
                top: posY,
                left: posX,
            })

            zoom.scrollTop(posY * scaleY);
            zoom.scrollLeft(posX * scaleX);
        }
        var bind = function() {
            self.hover(function() {
                show();
            }, function() {
                hide();
            });
            self.on('mousemove', function(e) {
                move(e);
            })
        }
        init();
        bind();
        return self;
    }
})(jQuery, window);