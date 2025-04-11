const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000; // 可根据需要修改

app.use(cors());
app.use(bodyParser.json());

app.get('/api/wallpapers/page/:page', async (req, res) => {
  const page = parseInt(req.params.page);


  const url = `https://wallhaven.cc/toplist?page=${page}`;

  console.log(url);

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://wallhaven.cc/"
      }
    });

    const html = response.data;

    const $ = cheerio.load(html);

    // 调整选择器逻辑
    $('section.thumb-listing-page ul li figure').each((i, element) => {
      const previewLink = $(element).find('a.preview').attr('href'); // 获取详情页链接
      const thumbSrc = $(element).find('img.lazyload').attr('data-src'); // 直接获取缩略图地址

      // 两种处理方式（选择其一）：
      // 方式1：直接使用缩略图地址（低分辨率）
      if (thumbSrc) imageUrls.push(thumbSrc.replace('th.wallhaven.cc', 'w.wallhaven.cc').replace('/small/', '/full/'));

      // 方式2：通过详情页解析高清图地址（需二次请求）
      // if (previewLink) {
      //   const fullUrl = previewLink.replace('/w/', '/api/v1/w/');
      //   // 调用详情页接口获取高清图地址（参考文档[6,8](@ref)）
      // }
    });

    res.json({ page, count: imageUrls.length, images: imageUrls });

  } catch (error) {
    res.status(500).json({error: 'Failed to fetch or parse HTML', details: error.message});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});
