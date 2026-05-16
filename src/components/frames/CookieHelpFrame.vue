<script setup lang="ts">
import SlackWindow from '@/components/slack/SlackWindow.vue'
import BotMsg from '@/components/slack/BotMsg.vue'
import EphemeralTag from '@/components/slack/EphemeralTag.vue'

interface CmdRow {
  cmd: string
  desc: string
}

const userCmds: CmdRow[] = [
  { cmd: '/cookie [tool]',         desc: 'Grab a cookie from the shelf' },
  { cmd: '/cookie me',             desc: "See what's in your jar" },
  { cmd: '/cookie who @person',    desc: "See what's in their jar" },
  { cmd: '/cookie who [tool]',     desc: 'See who manages a tool' },
  { cmd: '/cookie tool [name]',    desc: 'See who has a specific cookie' },
  { cmd: '/cookie team',           desc: "See everyone's cookies" },
  { cmd: '/cookie like @person',   desc: 'Grab the same cookies as someone' },
  { cmd: '/cookie like #channel',  desc: 'Grab what the team commonly has' },
]

const adminCmds: CmdRow[] = [
  { cmd: '/cookie grant @person',                 desc: 'Pick cookies to hand out' },
  { cmd: '/cookie grant @person tool1, tool2',    desc: 'Quick grant' },
  { cmd: '/cookie take @person',                  desc: 'Pick cookies to take back' },
  { cmd: '/cookie take @person tool1, tool2',     desc: 'Quick take' },
  { cmd: '/cookie take @person all',              desc: 'Take everything (with confirmation)' },
  { cmd: '/cookie shelf',                         desc: "See what's on the shelf" },
  { cmd: '/cookie shelf add [tool]',              desc: 'Add a cookie to the shelf' },
  { cmd: '/cookie shelf remove [tool]',           desc: 'Remove a cookie from the shelf' },
  { cmd: '/cookie settings',                      desc: 'View auto-approve settings' },
  { cmd: '/cookie settings [tool] on/off',        desc: 'Toggle company-wide' },
  { cmd: '/cookie settings #team [tool] on/off',  desc: 'Toggle per-team' },
  { cmd: '/cookie report #team',                  desc: 'Team adoption snapshot' },
]
</script>

<template>
  <SlackWindow dm dm-with="Cookie Jar" :max-width="620">
    <BotMsg ts="12:34 PM">
      <div class="text-[14.5px] font-extrabold text-[#1D1C1D] mb-1.5">
        Here's what you can do:
      </div>
      <div class="mt-1">
        <div
          v-for="row in userCmds"
          :key="row.desc"
          class="flex items-baseline gap-2 py-[3px] text-[13.5px] text-[#1D1C1D] leading-[1.55] flex-wrap"
        >
          <span
            class="font-mono text-[12.5px] px-[7px] py-px rounded inline-block whitespace-nowrap"
            style="color: #B45309; background: #FFF1DA; border: 1px solid #F0D9B0; line-height: 1.6;"
          >{{ row.cmd }}</span>
          <span class="text-[#1D1C1D]">— {{ row.desc }}</span>
        </div>
      </div>
      <div class="text-[14.5px] font-extrabold text-[#1D1C1D] mt-3.5 mb-1.5">
        Admin commands:
      </div>
      <div>
        <div
          v-for="row in adminCmds"
          :key="row.desc"
          class="flex items-baseline gap-2 py-[3px] text-[13.5px] text-[#1D1C1D] leading-[1.55] flex-wrap"
        >
          <span
            class="font-mono text-[12.5px] px-[7px] py-px rounded inline-block whitespace-nowrap"
            style="color: #B45309; background: #FFF1DA; border: 1px solid #F0D9B0; line-height: 1.6;"
          >{{ row.cmd }}</span>
          <span class="text-[#1D1C1D]">— {{ row.desc }}</span>
        </div>
      </div>
      <div class="mt-3.5 text-[13px] text-[#616061] italic">
        For the full picture, visit your <a href="#" class="text-blue no-underline">Cookie Jar dashboard</a>.
      </div>
      <EphemeralTag />
    </BotMsg>
  </SlackWindow>
</template>
