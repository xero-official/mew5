<template>
<div>
  <cx-footer v-if="isMewCx" />
  <div v-if="!isMewCx" class="footer">
    <!-- Modal -->
    <feedback-modal />
    <div class="wrap">
      <div class="page-container">
        <div class="grid-col-1-1-1-2 footer-contents">
          <div v-for="(item, index) in footerContent" :ref="item.class" :key="item.title + index" :class="item.class">
            <div class="content-title" @click="toggler(item.class)">
              <h3 class="lite">{{ $t(item.title) }}</h3>
              <p class="open" @click="openContent(item.class)">
                <i class="fa fa-plus" aria-hidden="true" />
              </p>
              <p class="close" @click="closeContent(item.class)">
                <i class="fa fa-minus" aria-hidden="true" />
              </p>
            </div>
            <div class="content-links">
              <div class="content-links-animation-block">
                <div v-for="(content, idx) in item.contents" :key="content.text + idx" class="content">
                  <div v-if="content.text === 'common.cstm-support'">
                    <customer-support :no-icon="true" />
                  </div>
                  <router-link v-else-if="content.to !== undefined" :to="content.to">
                    <p>{{ $t(content.text) }}</p>
                  </router-link>
                  <a v-else-if="content.to === undefined" :href="content.href" :aria-label="content.text" target="_blank" rel="noopener noreferrer">
                    <p v-if="item.class === 'e2'">
                      {{ $t(`${content.text}`) }}
                    </p>
                    <p v-else>{{ $t(content.text) }}</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="donate-us">
            <!--<div class="content-title">
              <i18n path="footer.title.love" tag="h3">
                <img slot="heart" src="~@/assets/images/icons/heart.svg" alt />
              </i18n>
            </div>-->
            <div class="links">
              <p>{{ $t('footer.donation.desc') }}</p>

              <a :href="'https://etherscan.io/address/' + ethDonationAddress" target="_blank" rel="noopener noreferrer"></a>
              <div :data-eth="ethDonationAddress" class="crypto-link d-flex align-items-center">
                <p>{{ content.text }}</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="donate-us">
          <div class="content-title">
            <h3 class="lite">
              {{ $t('footer.donate') }}
            </h3>
          </div>
          <div class="links">
            <p>{{ $t('footer.welcomeDes') }}</p>
            <p class="crypto-link">
              &nbsp;Ethereum / Xerom
              0xB69B9216B5089Dc3881A4E38f691e9B6943DFA11
            </p>

            <a href="https://blockchain.info/address/1ucuBe2hAhWWj5bVcDKVBsYaT37wdcd1n" target="_blank" rel="noopener noreferrer">
              <p class="crypto-link no-padding" data-btc="1ucuBe2hAhWWj5bVcDKVBsYaT37wdcd1n"></p>
              <span>{{ $t(link.title) }}</span>
            </a>
          </div>
        </div>
        <div class="copyright">
          <p>
            {{ $t('footer.pricing-p') }}
            <a href="https://coingecko.com/" target="_blank" rel="noopener noreferrer">{{ $t('footer.coingecko') }}</a>
            <br />
            {{ $t('footer.copyright') }}
          </p>
        </div>
        <div class="social">
          <a v-for="link in links" :key="link.class" :href="link.to" :aria-label="link.to" rel="noopener noreferrer" target="_blank">
            <i :class="'fa ' + link.class" />
          </a>
        </div>
      </div>
      <div class="copyright">
        <p>
          {{ $t('footer.copyright') }}
        </p>
      </div>
      <div class="social">
        <a v-for="link in links" :href="link.to" :key="link.class" :aria-label="link.to" rel="noopener noreferrer" target="_blank">
          <i :class="'fa ' + link.class" />
        </a>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import FeedbackModal from '@/components/FeedbackModal';
import CustomerSupport from '@/components/CustomerSupport';
import affiliates from './affiliates.js';
const version = VERSION;
import {
  Misc
} from '@/helpers';
import CxFooter from '@/layouts/ExtensionBrowserAction/components/CxFooter';

export default {
  components: {
    'feedback-modal': FeedbackModal,
    'customer-support': CustomerSupport,
    'cx-footer': CxFooter
  },
  data() {
    const isMewCx = Misc.isMewCx();
    return {
      isMewCx: isMewCx,
      version: version,
      lowerLinks: [{
          title: this.$t('footer.feedback'),
          href: 'mailto:ethan@ether1.org'
        },
        {
          title: `v${version}`,
          href: `https://github.com/MyEtherWallet/MyEtherWallet/releases/tag/v${version}`
        }
      ],
      footerContent: [{
          class: 'e1',
          title: 'footer.title.discover',
          contents: [{
            text: 'convertUnits.page.title',
            to: '/convert-units'
          }]
        },
        {
          class: 'e2',
          title: 'footer.title.affiliates',
          contents: affiliates
        },
        {
          class: 'e3',
          title: 'footer.title.mew',
          contents: [{
            text: this.$t('common.customerSupport'),
            href: 'mailto:admin@xerom.org'
          }]
        }
      ],
      links: [{
          to: 'https://twitter.com/XeromOfficial',
          class: 'fa-twitter'
        },
        {
          to: 'https://github.com/xero-official',
          class: 'fa-github'
        },
        {
          to: 'https://medium.com/@Ether1Official',
          class: 'fa-medium'
        },
        {
          to: 'https://vk.com/public190491855',
          class: 'fa-vk'
        }
      ]
    };
  },
  computed: {
    ...mapState('main', ['ethDonationAddress'])
  },
  mounted() {
    if (Misc.isMewCx()) {
      this.footerContent[0].contents = this.footerContent[0].contents.filter(
        item => {
          if (item.to !== '/send-offline-helper') return item;
        }
      );

      this.footerContent[2].contents = this.footerContent[2].contents.filter(
        item => {
          if (item.to !== '/#about-mew' && item.to !== '/#faqs') return item;
        }
      );
    }
  },
  methods: {
    openFeedbackModal() {
      this.$children[0].$refs.feedback.show();
    },
    openContent(element) {
      const openButton = document.querySelector('.' + element + ' .open');
      const closeButton = document.querySelector('.' + element + ' .close');
      const content = document.querySelector('.' + element + ' .content-links');
      openButton.style.display = 'none';
      closeButton.style.display = 'block';
      content.classList.remove('mobile-hide');
    },
    closeContent(element) {
      const openButton = document.querySelector('.' + element + ' .open');
      const closeButton = document.querySelector('.' + element + ' .close');
      const content = document.querySelector('.' + element + ' .content-links');
      openButton.style.display = 'block';
      closeButton.style.display = 'none';
      content.classList.add('mobile-hide');
    },
    toggler(ref) {
      const el = this.$refs[ref][0];
      el.classList.toggle('content-open');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'FooterContainer-desktop.scss';
@import 'FooterContainer-tablet.scss';
</style>
