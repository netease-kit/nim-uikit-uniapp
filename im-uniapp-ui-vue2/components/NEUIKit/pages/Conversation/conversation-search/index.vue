<template>
  <div>
    <NavBar :title="t('searchTitleText')" />
    <div class="search-wrapper">
      <div class="input-wrapper">
        <div class="search-icon-wrapper">
          <Icon
            iconClassName="search-icon"
            :size="16"
            color="#A6ADB6"
            type="icon-sousuo"
          ></Icon>
        </div>
        <input
          class="input"
          :value="searchText"
          @input="onInput"
          :focus="inputFocus"
          @focus="onInputFocus"
          @blur="onInputBlur"
          :placeholder="t('searchText')"
        />
        <div v-if="searchText" class="clear-icon" @tap="clearInput()">
          <Icon type="icon-shandiao" :size="16" />
        </div>
      </div>
    </div>
    <div v-if="searchResult.length > 0" class="search-result-wrapper">
      <div class="search-result-list">
        <div v-for="item in searchResult" :key="item.renderKey">
          <div class="result-title" v-if="item.title == 'friends'">
            {{ t('friendText') }}
          </div>
          <div class="result-title" v-else-if="item.title == 'groups'">
            {{ t('teamText') }}
          </div>
          <div class="result-title" v-else-if="item.title == 'discussions'">
            {{ t('discussionText') }}
          </div>
          <div v-else>
            <SearchResultItem :item="item" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="searchResult.length == 0 && searchText">
      <Empty :text="t('searchResultNullText')" />
    </div>
  </div>
</template>

<script>
/** 会话列表搜索页 */

import { t } from '../../../utils/i18n'
import NavBar from '../../../components/NavBar.vue'
import Icon from '../../../components/Icon.vue'
import SearchResultItem from './search-result-item.vue'
import Empty from '../../../components/Empty.vue'
import { isDiscussionFunc, toRenderSafeData } from '../../../utils'
import { autorun } from "../../../utils/store.js"

export default {
  components: {
    NavBar,
    Icon,
    SearchResultItem,
    Empty,
  },
  data() {
    return {
      inputFocus: false,
      searchText: '',
      searchList: [],
      searchListWatch: function () {},
    }
  },
  computed: {
    searchResult() {
      const res = []
      if (this.searchText) {
        const finalSections = this.searchList
          .map((item) => {
            if (item.id === 'friends') {
              return {
                ...item,
                list: item.list?.filter((friend) => {
                  return (
                    friend.alias?.includes(this.searchText) ||
                    friend.name?.includes(this.searchText) ||
                    friend.accountId?.includes(this.searchText)
                  )
                }),
              }
            }

            if (item.id === 'groups') {
              return {
                ...item,
                list: item.list?.filter((team) => {
                  return (team.name || team.teamId).includes(this.searchText)
                }),
              }
            }

            if (item.id === 'discussions') {
              return {
                ...item,
                list: item.list?.filter((team) => {
                  return (team.name || team.teamId).includes(this.searchText)
                }),
              }
            }

            return { ...item }
          })
          .filter((item) => !!item.list?.length)

        finalSections.forEach((item) => {
          if (item.id === 'friends') {
            res.push({
              title: 'friends',
              renderKey: 'friends',
            })
            item.list.forEach((friend) => {
              res.push({
                ...friend,
                renderKey: friend.accountId,
              })
            })
          } else if (item.id === 'groups') {
            res.push({
              title: 'groups',
              renderKey: 'groups',
            })
            item.list.forEach((team) => {
              res.push({
                ...team,
                renderKey: team.teamId,
              })
            })
          } else if (item.id === 'discussions') {
            res.push({
              title: 'discussions',
              renderKey: 'discussions',
            })
            item.list.forEach((team) => {
              res.push({
                ...team,
                renderKey: team.teamId,
              })
            })
          }
        })
      }
      return res
    },
  },
  created() {
    this.searchListWatch = autorun(() => {
      const friends =
        uni.$UIKitStore.uiStore.friends
          .filter(
            (item) =>
              !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
          )
          .map((item) => {
            const user = uni.$UIKitStore.userStore.users.get(item.accountId) || {
              accountId: '',
              name: '',
              createTime: Date.now(),
            }

            return {
              ...item,
              ...user,
            }
          }) || []

      const teamList =
        uni.$UIKitStore.uiStore.teamList.filter((team) => {
          try {
            return !isDiscussionFunc(team?.serverExtension)
          } catch (e) {
            return true
          }
        }) || []

      const discussionList =
        uni.$UIKitStore.uiStore.teamList.filter((team) => {
          try {
            return isDiscussionFunc(team?.serverExtension)
          } catch (e) {
            return false
          }
        }) || []

      this.searchList = toRenderSafeData([
        {
          id: 'friends',
          list: friends,
        },
        {
          id: 'groups',
          list: teamList,
        },
        {
          id: 'discussions',
          list: discussionList,
        },
      ].filter((item) => !!item.list.length)) || []
    })
  },
  mounted() {
    this.inputFocus = true
  },
  beforeDestroy() {
    this.searchListWatch()
  },
  methods: {
    t,
    onInputBlur() {
      this.inputFocus = false
    },
    onInputFocus() {
      this.inputFocus = true
    },
    onInput(event) {
      this.searchText = event.detail.value
    },
    clearInput() {
      this.inputFocus = true
      this.searchText = ''
    },
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #337eff;
$error-color: #f56c6c;

.search-wrapper {
  padding: 8px 10px;
}

.input-wrapper {
  height: 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #f3f5f7;
  border-radius: 5px;
  padding: 8px 10px;
}

.search-icon-wrapper {
  margin-right: 5px;
  display: flex;
  align-items: center;
}
.form-input-item {
  border-bottom: 1px solid #dcdfe5;
  padding: 10px 10px 5px 0px;
  display: flex;
  height: 44px;
  align-items: center;

  &.focus {
    border-color: $primary-color;
  }

  &.error {
    border-color: $error-color;
  }
}

.result-title {
  height: 30px;
  color: #c0c0c1;
  font-size: 14px;
  border-bottom: 1px solid #c0c0c1;
}

.input {
  flex: 1;
  height: 30px;
  border: none;
  outline: none;
}
.clear-icon {
  width: 40px;
  text-align: right;
}

.search-result-wrapper {
  padding: 0 10px;
}
</style>
