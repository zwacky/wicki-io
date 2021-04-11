---
title: "Pimp Your GitHub Profile with Books You Read"
publishDate: "2021-04-11"
description: "Automatically sync your Goodreads books you read on your GitHub profile with the help of GitHub Actions."
keywords: "github actions, github workflow, github profile, cron, goodreads"
image: "github-actions-goodreads-cover.png"
---

{{< figure src="/posts/2021-04-goodreads-workflow-for-github-actions/goodreads-github-profile-update-v2.png" caption="Keep the books you read in sync with your GitHub profile README" >}}

In this post I'd like to show you how to use GitHub Actions to automatically sync your Goodreads books you read in your GitHub profile README.

I created goodreads-profile-workflow for devs that love to read and like to share what they read. You can customise the input parameters to your liking: list the books you're currently reading, last 5 books you read and even add your personal ratings, too.

Leave a star on the repo if you think it's cool!

{{% stress %}}
**GitHub Repo:** https://github.com/zwacky/goodreads-profile-workflow

**GitHub Action Name:** Goodreads Profile Workflow
{{% /stress %}}

## GitHub Actions and Profile READMEs
{{< figure src="/posts/2021-04-goodreads-workflow-for-github-actions/github-actions-goodreads-cover.png" alt="Automatically sync your Goodreads books you read on your GitHub profile with the help of GitHub Actions" >}}



When you head over to your GitHub profile page, [https://github.com/zwacky](https://github.com/zwacky) in my case, you'll see that you can do more than just pin repositories. If you're missing yours, check out the [official docs on GitHub](https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme) to get one, too.

Keeping your profile README fresh with up-to-date data is a great way to show your visitors what you're up to or what you've been working on. Either you do it manually or you automate it with the help of GitHub Actions. They can run workflows periodically and update your README for you.

There are tons of great ones out there. Have a look at the great list [awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme) repo for inspiration. They include GitHub Actions that can:
* update your latest blog entries
* update your GitHub activity
* or even update your sleep data from your sleep tracker

---

## How To Use

I'll quickly explain here how to use `goodreads-profile-workflow` and what the GitHub Actions do. For a full step-by-step guide read the [how to use section](https://github.com/zwacky/goodreads-profile-workflow#how-to-use) of the project.

### #1 Add placeholders to your README

Your README.md will be updated and eventually updated every hour by the GitHub Action. So it needs to know where the list begins, and where it ends. The content inbetween will then be replaced with the latest content. As an example it could look like this:

```md
# Hey there 👋
I'm Simon and live in Berlin as a Freelance Frontend developer.

# Last 5 Books I've Read 🤓
<!-- GOODREADS-LIST:START -->
<!-- GOODREADS-LIST:END -->
```

You can customize the `GOODREADS-LIST` tags, so you can have multiple workflows updating different sections in your README. This is also what I'm using to get to the screenshot at the top of this post.

### #2 Create a workflow file

Create a file in your own GitHub profile repo so it's located at: `{REPO}/.github/workflows/goodreads-books-workflow.yml`.

GitHub Actions look for `*.yml` files in the `/.github/workflows` directory. These files are called workflows.

In this workflow file you can paste the following:

```yml
name: Latest book list from goodreads
on:
  schedule: # Run workflow automatically
    # This will make it run every hour
    - cron: "0 * * * *"
    # Run workflow manually (without waiting for the cron to be called), through the Github Actions Workflow page directly
  workflow_dispatch:
jobs:
  update-readme-with-goodreads-books:
    name: Update this repo's README with what you're currently reading
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: zwacky/goodreads-profile-workflow@main
        with:
          # Replace this with your goodreads user id (go to "My Books" on goodreads to see it in the URL)
          goodreads_user_id: "92930971"
          shelf: "currently-reading"
```

The last lines are input parameters. Make sure you change them with your Goodreads ID.

Have a look at all the [input parameters and template variables](https://github.com/zwacky/goodreads-profile-workflow#inputs) that goodreads-profile-workflow support.

### #3 Commit and trigger the workflow

If you head over to the Actions tab in the repo. You should see your "Latest book list from goodreads" workflow. This is also where you can see if the job ran successfully or if there is an issue or typo.

{{< figure src="/posts/2021-04-goodreads-workflow-for-github-actions/run-github-actions-manually.png" alt="manually trigger workflow for GitHub Actions" >}}

Alternatively you could also wait until the scheduler picks up on the `"0 * * * *"` setting (every hour) in the yml workflow.

### #4 Done 🎉

Hope you find this workflow useful! Please reach out via [GitHub issues](https://github.com/zwacky/goodreads-profile-workflow/issues) or [Twitter](https://twitter.com/zwacky). Excited to hear from all the different reading lists and how your profile looks. Please consider leaving a GitHub star.