let vueVersion: number;

// #ifdef VUE3
export * from "vue";
vueVersion = 3;
// #endif
console.log(`vue version is ${vueVersion}`);
export { vueVersion };
