## 放大镜插件

### 基础用法

```html
<div class="container">
  <div class="box J_zoom">
    <img src="./images/big1.jpg" alt="" class="zoom-img">
  </div>
</div>
<script src="./jqzoom.js"></script>
<script>
  $(function() {
    $('.J_zoom').jqzoom({
      width: 400,
      height: 400,
    });
  })
</script>
```

**注意点**

- 需要通过`css`来控制 位置和样式


- 放大镜类名为 `.zoomdiv` 


- 小放大镜类名为 `.jqZoomPup`
- 图片需要加 类名 `.zoom-img`