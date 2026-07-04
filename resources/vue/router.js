import { createRouter, createWebHistory } from 'vue-router'
import {
  DiceIcon,
  Chart01Icon,
  FavouriteIcon,
  Clock01Icon,
  Coins01Icon,
  UserGroupIcon,
  HomeIcon,
} from '@hugeicons/core-free-icons'

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('./views/Home.vue'),
    meta: {
      title: 'Tap Board',
      icon: HomeIcon,
    },
  },
  {
    name: 'SingleDice',
    path: '/single-dice',
    component: () => import('./boards/NormalDiceBoard.vue'),
    meta: {
      title: 'Single Dice',
      icon: DiceIcon,
    },
  },
  {
    name: 'TwoDice',
    path: '/two-dice',
    component: () => import('./boards/TwoDiceBoard.vue'),
    meta: {
      title: 'Two Dice',
      icon: DiceIcon,
    },
  },
  {
    name: 'ThreeTwo',
    path: '/three-and-two',
    component: () => import('./boards/ThreeTwoBoard.vue'),
    meta: {
      title: 'Three & Two',
      icon: DiceIcon,
    },
  },
  {
    name: 'DicePool',
    path: '/dice-pool',
    component: () => import('./boards/DicePoolBoard.vue'),
    meta: {
      title: 'Dice Pool',
      icon: DiceIcon,
    },
  },
  {
    name: 'TwentySided',
    path: '/twenty-sided-die',
    component: () => import('./boards/TwentySidedBoard.vue'),
    meta: {
      title: 'Twenty-sided Die',
      icon: DiceIcon,
    },
  },
  {
    name: 'Counter',
    path: '/counter',
    component: () => import('./boards/UpDownBoard.vue'),
    meta: {
      title: 'Counter',
      icon: Chart01Icon,
    },
  },
  {
    name: 'ScorePad',
    path: '/score-pad',
    component: () => import('./boards/ScorePadBoard.vue'),
    meta: {
      title: 'Score Pad',
      icon: Chart01Icon,
    },
  },
  {
    name: 'LifeCounter',
    path: '/life-counter',
    component: () => import('./boards/LifeCounterBoard.vue'),
    meta: {
      title: 'Life Counter',
      icon: FavouriteIcon,
    },
  },
  {
    name: 'TurnTimer',
    path: '/turn-timer',
    component: () => import('./boards/TurnTimerBoard.vue'),
    meta: {
      title: 'Turn Timer',
      icon: Clock01Icon,
    },
  },
  {
    name: 'CoinFlip',
    path: '/coin-flip',
    component: () => import('./boards/CoinFlipBoard.vue'),
    meta: {
      title: 'Coin Flip',
      icon: Coins01Icon,
    },
  },
  {
    name: 'FirstPlayer',
    path: '/first-player',
    component: () => import('./boards/FirstPlayerBoard.vue'),
    meta: {
      title: 'First Player',
      icon: UserGroupIcon,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
