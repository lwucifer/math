<template>
    <app-input 
        class="app-search-friend"
        :class="{ 'app-search--bordered': bordered }"
        v-bind="{ ...$attrs, ...$props }"
    >
        <app-button
            slot="prepend-inner"
            class="text"
            color="transparent"
        >
            <IconSearch class="icon body-1" />
        </app-button>
    </app-input>
</template>

<script>
import IconSearch from "~/assets/svg/icons/search.svg?inline";
export default {
    components:{
        IconSearch
    }
}
</script>

<style lang="scss">
.app-search-friend{
    .app-input__input{
        background: #F2F2F2;
        input::placeholder {
            color: #656565;;
        }
    }
    svg path{ fill:  #656565;}
}
</style>