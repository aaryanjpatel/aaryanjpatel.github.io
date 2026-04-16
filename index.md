---
layout: default
title: Home
---

<!-- Hero Section -->
<section class="hero bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
  <div class="container mx-auto text-center">
    <h1 class="text-5xl font-bold mb-4">Aaryan Patel</h1>
    <p class="text-xl mb-8">Passionate developer creating amazing web experiences</p>
    <div class="space-x-4">
      <a href="#about" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">About Me</a>
      <a href="#projects" class="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">My Projects</a>
    </div>
  </div>
</section>

<section id="about" class="mb-8 bg-white p-6 rounded-lg shadow-md fade-in">
<h1 class="text-3xl font-bold mb-4 text-blue-600">About</h1>
{% include_relative content/about.md %}
</section>

<section id="projects" class="mb-8 bg-white p-6 rounded-lg shadow-md fade-in">
<h1 class="text-3xl font-bold mb-4 text-blue-600">Projects</h1>
{% include_relative content/projects.md %}
</section>

<section id="contact" class="mb-8 bg-white p-6 rounded-lg shadow-md fade-in">
<h1 class="text-3xl font-bold mb-4 text-blue-600">Contact</h1>
{% include_relative content/contact.md %}
</section>