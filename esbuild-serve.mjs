import * as esbuild from 'esbuild';
import {baseConfig} from './esbuild-base.mjs';

const ctx = await esbuild.context(baseConfig);

await ctx.serve({
  port: 3333,
  host: 'localhost',
  servedir: baseConfig.outdir,
});