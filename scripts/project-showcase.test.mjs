import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getProjectsByFilter } from '../src/data/content.js';
import { globeInk } from '../src/pages/looks/globeInk.js';
import { layoutProjectShowcase, projectPlayback } from '../src/lib/projectShowcase.js';

test('all projects: spotlight is the stage, next two featured are wide, every name is kept', () => {
  const list = getProjectsByFilter('all');
  const layout = layoutProjectShowcase(list);

  assert.equal(layout.stage.slug, 'headcount-vouch');
  assert.equal(layout.stage.role, 'stage');
  assert.equal(layout.stage.name, 'Headcount & Vouch');
  assert.equal(layout.stage.still.kind, 'image');
  assert.match(layout.stage.still.src, /poster\.png$/);

  const wide = layout.cells.filter((cell) => cell.role === 'wide');
  assert.equal(wide.length, 2);
  assert.ok(wide.every((cell) => cell.featured));
  assert.equal(layout.cells.length, list.length - 1);
  const firstTile = layout.cells.findIndex((cell) => cell.role === 'tile');
  assert.ok(layout.cells.slice(0, firstTile).every((cell) => cell.role === 'wide'));

  const names = [layout.stage.name, ...layout.cells.map((cell) => cell.name)];
  assert.equal(new Set(names).size, list.length);
  for (const cell of layout.cells) {
    assert.ok(cell.name);
    assert.ok(cell.role === 'wide' || cell.role === 'tile');
  }
});

test('a filter with no spotlight uses the first featured project as the stage', () => {
  const list = getProjectsByFilter('xr');
  const layout = layoutProjectShowcase(list);
  const firstFeatured = list.find((project) => project.featured);

  assert.equal(layout.stage.slug, firstFeatured.slug);
  assert.notEqual(layout.stage.slug, 'headcount-vouch');
  assert.ok(layout.cells.every((cell) => cell.slug !== layout.stage.slug));
  const firstTile = layout.cells.findIndex((cell) => cell.role === 'tile');
  assert.ok(layout.cells.slice(0, firstTile).every((cell) => cell.role === 'wide'));
});

test('no featured projects: first item is the stage and nothing is wide', () => {
  const layout = layoutProjectShowcase([
    { slug: 'a', name: 'Alpha', featured: false, filter: 'web' },
    { slug: 'b', name: 'Beta', featured: false, filter: 'web' },
  ]);

  assert.equal(layout.stage.slug, 'a');
  assert.equal(layout.stage.href, '/projects/a');
  assert.equal(layout.stage.still, null);
  assert.deepEqual(
    layout.cells.map((cell) => cell.role),
    ['tile'],
  );
});

test('a gif idles while the pointer is away and the mp4 is the hover clip', () => {
  const list = getProjectsByFilter('all');
  const mockpad = projectPlayback(list.find((project) => project.slug === 'mockpad'));
  const stitch = projectPlayback(list.find((project) => project.slug === 'stitch'));
  const celestia = projectPlayback(list.find((project) => project.slug === 'celestia-vr'));
  const headcount = projectPlayback(list.find((project) => project.slug === 'headcount-vouch'));

  assert.equal(mockpad.idle.kind, 'gif');
  assert.match(mockpad.idle.src, /\.gif$/);
  assert.equal(mockpad.hover.kind, 'video');
  assert.match(mockpad.hover.src, /\.mp4$/);

  assert.match(stitch.idle.src, /preview\.gif$/);
  assert.match(stitch.hover.src, /stitch-demo-hover\.mp4$/);

  assert.equal(celestia.idle.kind, 'video');
  assert.match(celestia.idle.src, /loop\.mp4$/);
  assert.match(celestia.hover.src, /hover\.mp4$/);

  assert.equal(headcount.idle.kind, 'image');
  assert.match(headcount.hover.src, /\.mp4$/);
});

test('the page ground is paper and the project stage is not a magenta panel', () => {
  const css = readFileSync(new URL('../src/register.css', import.meta.url), 'utf8');
  assert.match(css, /--bg:\s*#f3efe6/);
  assert.doesNotMatch(css, /#e1006a/);
});

test('the paper sphere is ink, and the page type scale is larger than the browser default', () => {
  const paper = globeInk(false);
  const night = globeInk(true);
  assert.match(paper.star(0.9), /28,\s*25,\s*20/);
  assert.doesNotMatch(paper.star(0.9), /232,\s*214,\s*168/);
  assert.match(night.star(0.9), /232,\s*214,\s*168/);

  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(css, /html\s*\{[^}]*font-size:\s*125%/);
});

test('empty list has no stage', () => {
  const layout = layoutProjectShowcase([]);
  assert.equal(layout.stage, null);
  assert.deepEqual(layout.cells, []);
});
