---
title: SSH keys for multiple GitHub/Bitbucket users
author: Miles Blackwood
layout: post
permalink: /ssh-keys-multiple-github-bitbucket/
categories:
  - code
keyword: ssh
seo_title: ''
meta: 'Setting up ssh keys for multiple different accounts can be accomplished through use of an ssh config file, which you can configure on the OSX command line.'
---

Maybe you’ve noticed, when setting up ssh keys on OSX, that by default, when cloning, pulling or pushing to a repo on the command line, you will sometimes not have the proper permissions. If you’ve got more than one account on a different git service, like GitHub or BitBucket, here’s a way to set up your ssh config to allow for dynamic cloning of repos as those particular users.

Before you read the next section, make sure that you’ve set up ssh-keys as provided and added them to your accounts. This guide won’t cover that, as its already been covered in great length over at GitHub: [Generating SSH Keys](https://help.github.com/articles/generating-ssh-keys/). Follow this guide and you can’t go wrong.

## Configuring SSH aliases

All of your aliases can be managed in your `~/.ssh/config`. If you don’t have that file, create it:

~~~
Host customname bitbucket.org
  Hostname bitbucket.org
  IdentityFile ~/.ssh/id_rsa
  User yourusername
~~~

The “customname” parameter there should be replaced with whatever you want to use as the alias for this host. Make sure you replace “id_rsa” with whatever your ssh key for this particular service is called. Lastly, the User parameter should be your GitHub or Bitbucket username.

If you want to make sure the key is active, just do `ssh-add -l`.

## Adding the remote

If your repo exists already you’ll want to run something like this:

~~~
git remote add bit git@customname:yourusername/yourproject.git
~~~
{: .prompt}

Then you can do something like:

~~~
git push bit master
~~~
{: .prompt}

If you are just cloning the repo, you can do:

~~~
git clone git@customname:yourusername/yourproject.git
~~~
{: .prompt}

Your project should be preconfigured to use the proper ssh key and user for the particular service! Add and configure as many of these Host aliases to your ~/.ssh/config as required per each of your projects.

Source: [Ask Ubuntu: Multiple SSH keys and hosts](https://askubuntu.com/questions/269140/how-to-use-multiple-ssh-keys-with-different-accounts-and-hosts)