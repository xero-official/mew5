<template>
  <div class="social">
    <div class="wrap">
      <div class="page-container">
        <div class="content">
          <div class="title">
            <h2>{{ $t('home.social.title') }}</h2>
          </div>
          <div class="icons">
            <div v-for="(link, index) in links" :key="link.name + index">
              <a
                :href="link.to"
                :aria-label="link.name"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div :class="link.name">
                  <img :src="link.img" alt />
                  <p class="link-name">{{ link.name | capitalize }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import github from '@/assets/images/icons/github.png';
import medium from '@/assets/images/icons/medium.png';
import twitter from '@/assets/images/icons/twitter.jpg';

export default {
  data() {
    return {
      links: [
        {
          img: twitter,
          to: 'https://twitter.com/XeromOfficial',
          name: 'Twitter'
        },
        {
          img: medium,
          to: 'https://medium.com/Ether1Official',
          name: 'Medium'
        },
        {
          img: github,
          to: 'https://github.com/xero-official',
          name: 'github'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'Social.scss';
</style>
