const https = require('https');

const app_id = 'your_id';
const key = 'your_key';
const category = 'it-jobs';

// all search properties listed here must not contain spaces. There are some other options I haven't implemented that support spaces however.
class Search {
  constructor(
    what_and,
    what_or,
    what_exclude,
    title_only,
    max_days_old,
    category,
    salary_max,
    where,
    distance
    // Everything here is nullable, so if null return an empty string
  ) {
    const checkFalsey = (query, property) => {
      if (query) {
        return property + query + '&';
      }
      return '';
    };
    // takes an array and returns a properly formatted string
    const multi = (query, property) => {
      if (query) {
        let newQuery = '';
        for (let q in query) {
          newQuery = newQuery + query[q] + '%20';
        }
        const finalQuery = newQuery.slice(0, -3);
        return property + finalQuery + '&';
      }
      return '';
    };
    this.what_and = multi(what_and, 'what_and=');
    this.what_or = multi(what_or, 'what_or=');
    this.what_exclude = multi(what_exclude, 'what_exclude=');
    this.title_only = multi(title_only, 'title_only=');
    this.max_days_old = checkFalsey(max_days_old, 'max_days_old=');
    this.category = multi(category, 'category=');
    this.salary_max = checkFalsey(salary_max, 'salary_max=');
    this.where = checkFalsey(where, 'where=');
    this.distance = checkFalsey(distance, 'distance=');
  }
}

const requestUrl = (search) =>
  `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${key}&results_per_page=20&${
    search.what_and +
    search.what_or +
    search.what_exclude +
    search.title_only +
    search.max_days_old +
    search.category +
    search.salary_max +
    search.where +
    search.distance
  }salary_include_unknown=1&content-type=application/json`;
const remoteSearch = new Search(
  ['remote'],
  ['react', 'python', 'javascript', 'js', 'css', 'html', 'web', 'reactjs'],
  [
    'onsite',
    'year',
    'years',
    'yr',
    'yrs',
    'sr.',
    'hybrid',
    'mid',
    'intermediate',
  ],
  ['developer'],
  1,
  ['it-jobs'],
  '',
  '',
  ''
);
const localBlacklist = [
  'year',
  'years',
  'yr',
  'yrs',
  'sr.',
  'mid',
  'intermediate',
];
const localSearch = new Search(
  ['web', 'developer'],
  ['react', 'python', 'javascript', 'js', 'css', 'html', 'web', 'reactjs'],
  localBlacklist,
  '',
  1,
  [category],
  75000,
  '30041',
  25
);

const remoteUrl = requestUrl(remoteSearch);
const localUrl = requestUrl(localSearch);

// pass jobs.results into this
async function filter(request, blacklist) {
  return new Promise((resolve, reject) => {
    const response = [];
    https
      .request(request, (res) => {
        res.on('data', (data) => {
          response.push(data);
        });
        res.on('end', () => {
          let jobs = [];
          try {
            jobs = JSON.parse(response.join(''));
          } catch {
            resolve(request);
          }
          console.log(request);
          const filteredJobs = jobs.results.filter((job) => {
            const title = job.title.toLowerCase();
            // Descriptions are shortened in the api... functionality of filtering out phrases from descriptions is therefore limited.
            // Also the api for some reason fails to filter out some jobs based on the what_exclude property? Running my own limited filter to supplement (not perfect)
            const description = job.description.toLowerCase();
            const location = job.location.display_name.toLowerCase();
            return (
              !title.includes('ruby') &&
              !title.includes('senior') &&
              !title.includes('sr.') &&
              !title.includes('sr') &&
              !title.includes('structural') &&
              !title.includes('security') &&
              !title.includes('utilities') &&
              !title.includes('c++') &&
              !title.includes('test engineer') &&
              !title.includes('ci/cd') &&
              !title.includes('artificial intelligence') &&
              !title.includes('lead') &&
              !title.includes('midlevel') &&
              !blacklist.some((i) => {
                description.includes(i);
              })
            );
          });
          const removedJobs = String(jobs.count - filteredJobs.length);
          console.log(`Filtered out ${removedJobs} job(s)`);
          resolve(filteredJobs);
        });
      })
      .on('error', (err) => {
        reject(err);
      })
      .end();
  });
}

(async () => {
  const jobs = await filter(remoteUrl, localBlacklist);
  const board = [];
  // this displays the information in a more reader-friendly format
  for (j in jobs) {
    const job = jobs[j];
    let location = job.location.display_name;
    // sometimes will display some weird names for the location. if you come across any put them in here.
    if (location === 'Weirdsville, Some County') {
      location = 'Normalsville, Some County';
    }
    board.push({
      title: job.title,
      company: job.company.display_name,
      location: location,
      estimated: job.salary_min,
      description: job.description,
      url: job.redirect_url,
    });
  }
  console.log(board);
})();
