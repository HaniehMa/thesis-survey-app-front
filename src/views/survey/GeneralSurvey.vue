<template>
  <div class="step-container" id="survey-step-1">
    <h3>سوالات عمومی</h3>

    <el-form :model="generalSurvey" :rules="rules" ref="generalSurveyForm">
      <div class="block mb-halfrem">
        <p>نام</p>
        <el-form-item>
          <el-select
              v-model="activeParticipant"
              value-key="id"
              filterable
              placeholder="نام خود را از لیست انتخاب کنید"
          >
            <el-option
                v-for="member in teamMembers"
                :key="member.id"
                :label="member.name"
                :value="member"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="block mb-halfrem">
        <p>سن</p>
        <el-form-item prop="age">
          <el-input-number
            v-model="generalSurvey.age"
            :min="15"
            :max="80"
          ></el-input-number>
        </el-form-item>
      </div>
      <div class="block mb-halfrem">
        <p>جنسیت</p>
        <el-form-item prop="sex">
          <el-radio-group v-model="generalSurvey.sex" dir="ltr" class="sex">
            <el-radio-button label="female">خانم</el-radio-button>
            <el-radio-button label="male">آقا</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="block mb-halfrem">
        <p>چند سال سابقه‌ی کار دارید؟</p>
        <el-form-item prop="tenure">
          <el-input-number
            v-model="generalSurvey.tenure"
            :min="0"
            :max="40"
          ></el-input-number>
        </el-form-item>
      </div>
      <div class="block mb-halfrem">
        <p>چند ماه است که در این تیم حضور دارید؟</p>
        <el-form-item prop="teamHistory">
          <el-input-number
            v-model="generalSurvey.teamHistory"
            :min="0"
            :max="150"
          ></el-input-number>
        </el-form-item>
      </div>
    </el-form>
  </div>
  <proceed-button type="proceed" text="گام بعد" @click="goNext" />
</template>

<script lang="ts">
import { TeamMember } from "@/models";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import {ElForm} from "element-plus";

export default defineComponent({
  name: "GeneralSurvey",
  methods: {
    goNext() {
      if (!this.activeParticipant.name) return;
      // const activeParticipantForm = this.$refs.activeParticipantForm as any;
      const generalSurveyForm = this.$refs.generalSurveyForm as typeof ElForm;
      generalSurveyForm.validate((valid: boolean) => {
        if (valid) {
          this.$emit("proceed");
        } else return false;
      });
    },
  },
  computed: {
    ...mapGetters({ teamMembers: "NotYetRespondedTeamMembers" }),
    // teamMembers() {
    //   return this.$store.state.teamInfo.members;
    // },
    generalSurvey: {
      get() {
        return this.$store.state.survey.generalSurvey;
      },
      set(value) {
        this.$store.commit("setGeneralSurveyResponse", value);
      },
    },
    activeParticipant: {
      get(): TeamMember {
        return this.$store.state.activeParticipant;
      },
      set(participant) {
        this.$store.commit("setActiveParticipant", participant);
      },
    },
  },
  data() {
    return {
      rules: {
        activeParticipant: [
          { required: true, message: "نام خود را انتخاب کنید" },
        ],
        age: [{ required: true, message: "سن خود را وارد کنید" }],
        sex: [{ required: true, message: "جنسیت خود را انتخاب کنید" }],
        tenure: [
          { required: true, message: "مدت سابقه کار خود را تعیین کنید" },
        ],
        teamHistory: [
          { required: true, message: "مدت همکاری خود با تیم را وارد کنید" },
        ],
      },
    };
  },
});
</script>

<style></style>
