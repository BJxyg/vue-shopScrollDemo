<template>
  <div>
    <ul>
      <li v-for="item in shops" :key="item.skuId">
        <div class="content">
          <div class="intro">
            <img :src="item.pictureUrl">
            <div class="pd_info">
              <p>{{item.name}}</p>
            </div>
            <div class="price">
              <div class="pd_now_price">
                <span>￥</span>
                <em>{{item.pPrice}}</em>
              </div>
              <div class="pd_old_price">
                <del v-if="item.pcpPrice!=''">￥{{item.pcpPrice}}</del>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div :class="showToTop==true?'goto_top':''" @click="gotop"></div>
    <div v-show="isEnd" class="botton_tip">到底啦,没有更多了</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shops: [],
      showToTop: false,
      pageNum: 1,
      isLoading: false,
      isEnd: false
    };
  },
  methods: {
    getdata() {
      this.isLoading = true;
      let self = this;
      let callbackName = "jsonp" + self.pageNum;
      let body = {
        secondTabId: "00042920_12620761_t0;0_08201626__",
        type: "0",
        pageNum: self.pageNum,
        ofn: "16",
        passback:
          '{"platform":"h5","moduleId":12620761,"subscript":"0","isFlexible":"0","priceFilter":"1","jdPrice":"1","showLongPic":"0","similar":"0"}',
        mitemAddrId: "",
        geo: { lng: "", lat: "" },
        addressId: "",
        posLng: "",
        posLat: "",
        focus: "",
        innerAnchor: "",
        mtm_source: "",
        mtm_subsource: "",
        USER_FLAG_CHECK: "",
        sid: ""
      };
      body = JSON.stringify(body);

      $.ajax({
        url: "https://api.m.jd.com/client.action",
        dataType: "jsonp",
        jsonpCallback: callbackName,
        async: true,
        data: {
          functionId: "getBabelProductPaged",
          body: body,
          screen: "640 * 1136",
          client: "wh5",
          clientVersion: "1.0.0",
          sid: "",
          uuid: 15127937816521115366467,
          area: "",
          _: 1546609439580,
          callback: callbackName
        },
        success: function(res) {
          if (res.waresPagedList.length > 0) {
            self.shops = self.shops.concat(res.waresPagedList);
            self.pageNum++;
          } else {
            self.isEnd = true;
          }
          self.isLoading = false;
        },
        error: function(err) {
          self.isLoading = false;
          console.log(err);  
        }
      });
    },
    scroll() {
      let offHeith =
        document.documentElement.offsetHeight -
        document.documentElement.scrollTop -
        window.innerHeight;
      if (offHeith <= 200 && !this.isLoading && !this.isEnd) {
        this.getdata();
      }

      if (document.documentElement.scrollTop > window.innerHeight) {
        this.showToTop = true;
      } else {
        this.showToTop = false;
      }

      // console.log("*****************************");
      // console.log(document.documentElement.offsetHeight);
      // console.log(document.documentElement.scrollTop);
      // console.log(window.innerHeight);
      // console.log(document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight)
      // console.log("*****************************");
    },
    gotop() {
      document.documentElement.scrollTop = 0;
    }
  },
  mounted: function() {
    this.getdata();
    window.addEventListener("scroll", this.scroll);
  }
};
</script>

<style lang="less" scoped>
em {
  font-style: normal;
}

ul {
  padding: 5px 10px 0px 10px;

  li {
    background-color: rgb(246, 60, 86);
    list-style: none;
    float: left;
    width: 50%;
    padding-bottom: 5px;
    &:nth-of-type(odd) {
      .content {
        padding-right: 2.5px;
        background-color: rgb(246, 60, 86);
      }
    }
    &:nth-of-type(even) {
      .content {
        padding-left: 2.5px;
        background-color: rgb(246, 60, 86);
      }
    }
    .content {
      background-color: rgb(255, 255, 255);
      // height: 259px;
      .intro {
        width: 100%;
        height: 100%;
        background-color: rgb(255, 255, 255);

        .pd_info {
          margin-top: 6px;
          padding: 0px 10px 0px 10px;
          color: rgb(43, 43, 43);
          font-family: "Microsoft YaHei,Verdana,Arial,Helvetica,sans-serif";
          font-size: 13px;
          line-height: 17px;
          height: 34px;
          // text-overflow: ellipsis;
          p {
            margin: 0px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        .price {
          bottom: 0;
          margin-top: 20px;
          padding: 0px 10px 0px 10px;

          span {
            padding: 0px;
            margin: 0px;
          }

          div {
            display: inline-block;
          }

          .pd_now_price {
            margin-right: 3px;
            font-size: 0px;
            color: rgb(0, 0, 0);

            span {
              font-size: 12px;
            }
            em {
              font-size: 15px;
            }
          }

          .pd_old_price {
            font-size: 12px;
            color: rgb(173, 173, 173);
          }
        }
      }
    }

    img {
      width: 100%;
    }
  }
}

.goto_top {
  right: 10px;
  width: 45px;
  height: 45px;
  background-image: url("../img/top.png");
  position: fixed;
  z-index: 999;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
  bottom: 60px;
}

.botton_tip {
  width: 100%;
  height: 30px;
  bottom: 30px;
  display: flex;
  z-index: 999;
  background-color: rgb(173, 173, 173);
}
</style>
