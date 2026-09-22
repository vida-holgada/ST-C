/* Non-identifying score × recorded rearrest aggregates, not individual records.
   Source: https://technologyreview.github.io/Fairness/data/real_score_bw.csv
   Each pair is [rearrested within two years, not rearrested]. Retrieved 2026-09-22. */
const COMPAS_DATA = {
 white:[[8,44],[9,22],[9,16],[9,18],[10,15],[7,2],[4,3],[3,4],[5,3],[5,2]],
 black:[[10,22],[10,27],[18,13],[7,17],[7,17],[27,12],[18,11],[24,11],[16,6],[24,5]]
};
if(typeof module !== 'undefined') module.exports=COMPAS_DATA;
