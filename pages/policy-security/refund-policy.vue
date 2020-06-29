<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-3">
                <PolicyManagerSide :setActive="3"/>
            </div>

            <div class="col-12 col-md-9">
                
            </div>
        </div>
    </div>
</template>

<script>
import PolicyManagerSide from "~/components/page/policy-security/PolicyManagerSide";

export default {
    components: {
        PolicyManagerSide
    }
}
</script>

<style>

</style>