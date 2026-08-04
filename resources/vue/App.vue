<template>
	<Navigation v-if="menuVisible" ref="navigation">
		<Header
			title="Tap Board"
			:logo-url="logoUrl"
			:sidebar-enabled="true"
			:show-branding="true"
			:top-bar-enabled="false"
			:breadcrumbs="false"
			@toggle-sidebar="toggleSidebar"
		>
			<template #toolbar>
				<QuickSearch
					ref="quickSearch"
					placeholder="Search boards..."
					:search-fields="['title', 'name', 'description', 'category']"
					:max-results="15"
					:auto-import-routes="false"
				/>
			</template>

			<template #user-info>
				<button
					type="button"
					class="theme-toggle-btn neutral"
					:aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
					@click="onToggleTheme"
				>
					<HugeiconsIcon
						:icon="theme === 'dark' ? Sun01Icon : Moon02Icon"
						width="1em"
						height="1em"
						:stroke-width="3"
					/>
				</button>
			</template>
		</Header>

		<div id="layout">
			<Sidebar ref="sidebar" />

			<div id="content">
				<main>
					<router-view />
				</main>

				<footer />
			</div>
		</div>
	</Navigation>

	<main v-else class="board-only">
		<router-view />
	</main>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowExpandIcon, Cancel01Icon, Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons'

import Header from 'picocrank/vue/components/Header.vue'
import Navigation from 'picocrank/vue/components/Navigation.vue'
import QuickSearch from 'picocrank/vue/components/QuickSearch.vue'
import Sidebar from 'picocrank/vue/components/Sidebar.vue'

import { fullscreen } from './util.js'
import { resolveTheme, toggleTheme as switchTheme } from './theme.js'

import 'picocrank/styles.css'
import '../stylesheets/theme.css'
import '../stylesheets/style.css'

import logoUrl from '/logo.svg'

const navigation = ref(null)
const sidebar = ref(null)
const quickSearch = ref(null)
const menuVisible = ref(true)
const theme = ref(resolveTheme())

function onToggleTheme () {
  theme.value = switchTheme(theme.value)
}

function toggleSidebar () {
  if (sidebar.value) {
    sidebar.value.toggle()
  }
}

function closeMenu () {
  alert('Refresh the page to get the menu back')
  menuVisible.value = false
}

function registerQuickSearchItems () {
  if (!quickSearch.value || !navigation.value) {
    return
  }

  quickSearch.value.clearItems()

  let category = 'Navigation'

  for (const link of navigation.value.getNavigationLinks()) {
    if (link.type === 'section') {
      category = link.title
      continue
    }

    if (link.type === 'separator' || link.type === 'html') {
      continue
    }

    if (link.type === 'route') {
      quickSearch.value.addItem({
        id: `nav-${link.name}`,
        title: link.title,
        name: link.name,
        description: link.description,
        category,
        path: link.path,
        icon: link.icon,
        type: 'route',
      })
      continue
    }

    if (link.type === 'callback') {
      quickSearch.value.addItem({
        id: `nav-${link.name}`,
        title: link.title,
        name: link.name,
        description: link.description,
        category,
        icon: link.icon,
        type: 'callback',
        callback: link.callback,
      })
    }
  }
}

onMounted(() => {
  nextTick(() => {
    if (navigation.value) {
      navigation.value.addRouterLink('Home')

      navigation.value.addSection('Dice', { name: 'nav-dice' })
      navigation.value.addRouterLink('SingleDice')
      navigation.value.addRouterLink('TwoDice')
      navigation.value.addRouterLink('ThreeTwo')
      navigation.value.addRouterLink('DicePool')
      navigation.value.addRouterLink('TwentySided')

      navigation.value.addSection('Scoring', { name: 'nav-scoring' })
      navigation.value.addRouterLink('Counter')
      navigation.value.addRouterLink('ScorePad')
      navigation.value.addRouterLink('LifeCounter')

      navigation.value.addSection('Utilities', { name: 'nav-utilities' })
      navigation.value.addRouterLink('TurnTimer')
      navigation.value.addRouterLink('CoinFlip')
      navigation.value.addRouterLink('FirstPlayer')

      navigation.value.addSection('Actions', { name: 'nav-actions' })
      navigation.value.addCallback('Fullscreen', fullscreen, { icon: ArrowExpandIcon, name: 'fullscreen' })
      navigation.value.addCallback('Close Menu', closeMenu, { icon: Cancel01Icon, name: 'close-menu' })
    }

    if (sidebar.value) {
      sidebar.value.open()
      sidebar.value.stick()
    }

    registerQuickSearchItems()
  })
})
</script>
