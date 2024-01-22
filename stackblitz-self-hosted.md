---
title: "Announcing self-hosted StackBlitz"
description: We’re excited to share today that StackBlitz Enterprise Server, a self-managed build of StackBlitz, is generally available to any team interested in a totally new approach to web development.
author: eric
pubDate: 2024-01-23
category: newsAndAnnouncements
tags:
  - stackblitz
  - enterprise
---

Since we first launched StackBlitz, enterprises have organically adopted StackBlitz as part of their public documentation and development workflows. For example, check out how companies like [Google](https://stackblitz.com/case-studies/google) and [Porsche](https://twitter.com/stackblitz/status/1648341661762633729) use StackBlitz to power live examples and one-click bug reporting for their design systems.

However, we’re regularly asked for a version of StackBlitz that can [run entirely within an organization’s firewall](https://stackblitz.com/enterprise). So, for the past year, we have been working with a small number of early adopters on our fully self-hosted version of StackBlitz. 

We’re excited to share today that **[StackBlitz Enterprise Server](https://stackblitz.com/enterprise), a self-managed build of StackBlitz, is generally available to any team interested in a totally new approach to web development.**

By self-hosting StackBlitz, you can provide production-grade development environments that run entirely inside the browser to every developer across the enterprise. StackBlitz runs behind your VPN and connects with your company’s npm registry (for example, Artifactory or Nexus) and git-based code repositories (like BitBucket, GitLab, and GitHub).

Here a few ways our early-access customers are using StackBlitz within their organizations:

### Drive library and design system adoption at scale

After the process of establishing an enterprise-wide design system wraps up, the hard work of onboarding the organization begins. [Borrowing from tried and tested strategies from the open source world](https://blog.stackblitz.com/posts/design-systems/), enterprise teams are using StackBlitz to provide live, interactive and fully internal documentation for their engineers. 

Using the StackBlitz SDK and integrated with your private registries, you can provide one-click environments for developers to explore and test out new code without needing to train teams one at a time.

### Bug reproductions with a single link

With StackBlitz, entire [environments can be shared with a single URL](https://developer.stackblitz.com/guides/integration/bug-reproductions). When triaging bug reports, you no longer have to spend time with tedious local configuration just to reproduce the issue. Save your teams time by requiring a StackBlitz link in each **Jira, Confluence, or GitHub** ticket. 

### Streamline PR reviews

Every time you need to review a pull request or a teammate’s branch, you’re stashing your changes, switching branches (or repositories), and reinstalling dependencies. 

Even for the most seasoned engineer, setting up local development environments multiple times per day can be cumbersome and time-consuming. For complex projects requiring specific configuration and toolchains, it’s especially tedious. 

Developers lose hours of valuable time every week combing through disorganized local versions of shared projects, tracking down dependency-related errors, and trying to replicate a coworker’s environment.

With StackBlitz, you can easily move in and out of different branches, repositories, and code bases without impacting your local development. We like to say upgrading to StackBlitz for collaboration is like going from a single-burner to a multi-burner stove.

## Why self-host StackBlitz?

Self-hosting StackBlitz addresses the needs and challenges faced by enterprise frontend web application developers: 

### Security that doesn’t compromise DX

Made possible by our [WebContainers runtime](https://blog.stackblitz.com/posts/introducing-webcontainers/), StackBlitz executes all code within the browser security sandbox. Getting new tools for your development teams approved by security can be a challenge, but we can confidently say our model is the most secure code execution environment in the world thanks to the hard work and billions of dollars Google, Microsoft, Apple and Mozilla invest to make browser engines the most ubiquitous and secure place to run untrusted code.

Running code locally exposes organizations to security threats. Dependencies from public repositories can introduce malicious code through “supply chain” vulnerabilities. In theory, cloud VM-based solutions can provide more convenience and governance, but the DevSecOps oversight required to manage thousands of VMs and keep employees safe can be immense. Not only that, accessing VM-based environments across a corporate VPN means significant boot times and network latency, making it frustrating and slow to work with.

**With StackBlitz, not only is the code execution isolated to each user’s browser tab, <u>we don’t rely on spinning up dedicated infrastructure for each environment</u>.** DevOps teams no longer need to manage, lock down, and terminate thousands of ephemeral VMs and containers. Meanwhile, developers get environments that boot up instantly with zero network latency.

### Scale productivity, not your hosting costs

With a lot of enterprise software, the efficiency gained by one team is often cancelled out by new or expanded maintenance and management work for DevOps and security teams. 

Specifically, cloud-based developer environments also generate eye watering costs for the cloud resources they consume. Spikes in usage (for example, from onboarding new developers or running internal demos) make these costs hard to predict, too. Many teams we have spoken to using VM-dependent solutions dedicate significant DevOps resources to ensuring unused environments are not left running without inadvertently deleting critical work.

Our compute model ensures this is never the case for StackBlitz.

StackBlitz Enterprise Server is deployed on a single Kubernetes cluster that can scale to tens of thousands of concurrent users without needing more infrastructure. It’s the same underlying model that allows us to make [stackblitz.com](http://stackblitz.com) available to over 2.5 million developers each month without incurring massive infrastructure costs or employing hundreds of DevOps engineers.

### Tools your developers are already using

StackBlitz is already used by millions of developers each month. In fact, almost *all* of our enterprise customers were already using StackBlitz in some form before deciding to self-host StackBlitz.

Even for those developers who have never opened a StackBlitz link, our next-generation editor is built atop the robust and ubiquitous Visual Studio Code, providing an environment that feels instantly familiar. Your team can even bring their favorite themes, extensions, and keybindings. 

StackBlitz includes everything you’d expect from a modern IDE including a terminal, multiple package managers including npm, pnpm, and yarn, advanced code completion features, version control integration, and debugging tools. However, unlike any other IDE out there, StackBlitz runs entirely within a secure, isolated dev environment within the browser itself.

That means an instant dev environment is always a click away with zero configuration needed. 

### Fits your existing set up

We designed StackBlitz to be additive to your existing systems and processes, not disruptive to them. For example:

- **Sync with your enterprise package management** system including private npm registires, JFrog Artifactory & Sonatype Nexus.
- **Your version control remains the source of truth.** We integrate with Bitbucket, GitLab, and GitHub Enterprise.
- **Deploy how and where you want.** Self host StackBlitz with a single Kubernetes instance, regardless of how many users you add. StackBlitz Enterprise Server can run on-prem (using Openshift, VSphere, etc) or in a VPC with any cloud provider.
- **SSO with any SAML2-based authentication provider** including Okta, Azure AD, and more.
<!-- 
## See for yourself and get a free StackBlitz t-shirt

If you work in web development at an enterprise, we want to hear from you. [Get in touch](http://stackblitz.com/enterprise-contact) to learn how StackBlitz Enterprise Server can eliminate toil from your team’s daily workflows. To celebrate Enterprise Server reaching GA, we are happy to send a free StackBlitz t-shirt to everyone we meet with.  -->

## See for yourself and get a surprise gift

If you work in web development at an enterprise, we want to hear from you. [Get in touch](http://stackblitz.com/enterprise-contact) to learn how StackBlitz Enterprise Server can eliminate toil from your team’s daily workflows. To celebrate Enterprise Server reaching GA, we have a very exclusive gift we’ll share with everyone we meet with.

Cheers and happy coding!