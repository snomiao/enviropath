/**
 * test powershell
 * author: YiDong Zhuo(snomiao@gmail.com)
 */
import { sortedUniqBy, uniq } from 'lodash';
import { enviropathFix } from '../src/enviropath';
if (require.main === module) (async () => {
    return await enviropathFix();
})().then(console.log).catch(console.error)


