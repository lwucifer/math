<template>
    <div>
        <portal to="modal">
            <div class="app-modal-root" id="modal-root">
                <div class="app-modal-overlay"></div>
                <div
                    class="app-modal-wrapper"
                    tabindex="-1"
                    role="dialog"
                    v-bind="$attrs"
                    :class="{...classes, ...componentClass}"
                    @click.self="$emit('close')"
                >
                    <div
                        class="app-modal"
                        role="document"
                        :style="`width: ${typeof width === 'number' ? width + 'px' : width}`"
                    >
                        <div class="app-modal-content">
                            <slot name="header"/>
                            <slot name="content"/>
                            <slot name="footer"/>
                        </div>
                    </div>
                </div>
            </div>
        </portal>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,

        props: {
            width: {
                type: [Number, String],
                default: 520 // number in px or css value
            },
            componentClass: {
                type: Object,
                default: {}
            },
            centered: Boolean,
            visible: Boolean
        },

        computed: {
            classes() {
                return {
                    'app-modal-centered': this.centered
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "~/assets/scss/components/app/_app-modal.scss";
</style>