import {copy} from 'esbuild-plugin-copy';
import {sassPlugin} from 'esbuild-sass-plugin'

export const baseConfig = {
  entryPoints: [
    {out: 'bundle', in: 'index.jsx'},
  ],
  outdir: 'build',
  bundle: true,
  tsconfig: 'tsconfig.json',
  plugins: [
    copy({
      assets: {
        from: ['./public/*'],
        to: ['./'],
      },
    }),
    sassPlugin(),
  ],
};