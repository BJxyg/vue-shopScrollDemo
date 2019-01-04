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
                <del>{{item.pcpPrice}}</del>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div :class="showToTop==true?'goto_top':''" @click="gotop"></div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      shops: [],
      showToTop: false
    };
  },
  methods: {
    getdata() {
      let self = this;

      $.ajax({
        url:
          "https://api.m.jd.com/client.action?functionId=getBabelProductPaged&body=%7B%22secondTabId%22%3A%2200042920_12620761_t0%3B0_08201626__%22%2C%22type%22%3A%220%22%2C%22pageNum%22%3A%221%22%2C%22ofn%22%3A%2216%22%2C%22passback%22%3A%22%7B%5C%22platform%5C%22%3A%5C%22h5%5C%22%2C%5C%22moduleId%5C%22%3A12620761%2C%5C%22subscript%5C%22%3A%5C%220%5C%22%2C%5C%22isFlexible%5C%22%3A%5C%220%5C%22%2C%5C%22priceFilter%5C%22%3A%5C%221%5C%22%2C%5C%22jdPrice%5C%22%3A%5C%221%5C%22%2C%5C%22showLongPic%5C%22%3A%5C%220%5C%22%2C%5C%22similar%5C%22%3A%5C%220%5C%22%7D%22%2C%22mitemAddrId%22%3A%22%22%2C%22geo%22%3A%7B%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D%2C%22addressId%22%3A%22%22%2C%22posLng%22%3A%22%22%2C%22posLat%22%3A%22%22%2C%22focus%22%3A%22%22%2C%22innerAnchor%22%3A%22%22%2C%22mtm_source%22%3A%22%22%2C%22mtm_subsource%22%3A%22%22%2C%22USER_FLAG_CHECK%22%3A%22%22%2C%22sid%22%3A%22%22%7D&screen=750*1334&client=wh5&clientVersion=1.0.0&sid=&uuid=1132737184&area=&_=1546581595485&callback=jsonp2",
        dataType: "jsonp",
        jsonpCallback: "jsonp2",
        async: true,
        success: function(res) {
          if (res.waresPagedList) {
            self.shops = self.shops.concat(res.waresPagedList);
          }
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    scroll() {
      // console.log("*****************************");
      // console.log(document.documentElement.offsetHeight);
      // console.log(document.documentElement.scrollTop);
      // console.log(window.innerHeight);
      // console.log(document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight)
      // console.log("*****************************");

      let offHeith =
        document.documentElement.offsetHeight -
        document.documentElement.scrollTop -
        window.innerHeight;
      if (offHeith <= 200) {
        this.getdata();
      }

      if (document.documentElement.scrollTop > 100) {
        this.showToTop = true;
      } else {
        this.showToTop = false;
      }
    },
    gotop() {
      document.documentElement.scrollTop = 0;
    }
  },
  created() {},
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
</style>
