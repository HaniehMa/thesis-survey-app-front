<template>
  <div class="step-container" id="survey-step-4">
    <h3>
      ارزیابی اثربخشی تیم از نظر شما
    </h3>
    <el-card class="mb-halfrem">
      <template
        v-for="(question, index) in teamEffectivenessSurvey"
        :key="index"
      >
        <likert-scale-question
            :ref="`f-${question.index}`"
            :question="question"
            mutation-type="setTeamEffectivenessSurveyResponse"
        />
        <el-divider></el-divider>
      </template>
    </el-card>
  </div>
  <proceed-button type="proceed" text="گام بعد" @click="goNext" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LikertScaleQuestion from "@/core/components/LikertScaleQuestion.vue";

export default defineComponent({
  name: "TeamEffectivenessSurvey",
  components: { LikertScaleQuestion },
    methods: {
      validateAll():boolean {
        let valid = true;
        for (const refKey in this.$refs){
          const form = this.$refs[refKey] as typeof LikertScaleQuestion
          form.validate((isValid:boolean) => {valid &&=isValid;})
        }
        return  valid;
      },
    goNext():void | boolean {
       if (this.validateAll()) {
          this.$emit("proceed");
        } else {
          return false;
        }
      }
    },
  computed: {
    teamEffectivenessSurvey() {
        return this.$store.state.survey.teamEffectivenessSurvey;

    },
  },
});
</script>

<style></style>
