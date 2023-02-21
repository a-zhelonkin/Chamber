import * as esbuild from 'esbuild';
import {baseConfig} from './esbuild-base.mjs';

await esbuild.build(baseConfig);