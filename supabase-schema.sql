-- ─────────────────────────────────────────────────────────────────────────────
-- MERIDIAN GROUP — Supabase Database Schema
-- Run this entire file in: supabase.com → your project → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. PAGE CONTENT ──────────────────────────────────────────────────────────
-- Stores every editable text field across all pages.
-- Each row = one field. (page="home", key="hero-title", value="Navigate What's Next.")

CREATE TABLE IF NOT EXISTS page_content (
  id         BIGSERIAL PRIMARY KEY,
  page       TEXT NOT NULL,
  key        TEXT NOT NULL,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (page, key)
);

-- Allow anyone to READ content (public site)
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read content"
  ON page_content FOR SELECT
  USING (true);

-- Only authenticated admins can write content
CREATE POLICY "Admins can write content"
  ON page_content FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Index for fast page lookups
CREATE INDEX idx_page_content_page ON page_content (page);


-- ── 2. CONTACT FORM INQUIRIES ─────────────────────────────────────────────────
-- Stores every contact form submission.

CREATE TABLE IF NOT EXISTS inquiries (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  company    TEXT,
  email      TEXT NOT NULL,
  phone      TEXT,
  service    TEXT,
  budget     TEXT,
  message    TEXT NOT NULL,
  read       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Anyone can insert (submit a form)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiry"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Only admins can read submissions
CREATE POLICY "Admins can read inquiries"
  ON inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update inquiries"
  ON inquiries FOR UPDATE
  USING (auth.role() = 'authenticated');


-- ── 3. SEED: DEFAULT CONTENT ──────────────────────────────────────────────────
-- Pre-populate the DB with the default text from the HTML files.
-- After this, the site works immediately without any admin edits needed.

INSERT INTO page_content (page, key, value) VALUES
  -- Home
  ('home','hero-eye','Global Strategy & Technology Consultancy'),
  ('home','hero-l1','Navigate'),
  ('home','hero-l2','What''s'),
  ('home','hero-l3','Next.'),
  ('home','hero-sub','We help ambitious organizations define clear strategy, harness technology, and execute with conviction — in a world that rewards speed and clarity.'),
  ('home','hero-cta1','Explore Our Work'),
  ('home','hero-cta2','Schedule a Call'),
  ('home','hc1-label','Clients served globally'),
  ('home','hc1-sfx','+'),
  ('home','hc1-desc','Across 15 countries and 6 industries'),
  ('home','hc2-label','Value created for clients'),
  ('home','hc2-pre','$'),
  ('home','hc2-sfx','.2B'),
  ('home','hc2-desc','Measurable impact since 2008'),
  ('home','hc3-label','Client retention rate'),
  ('home','hc3-sfx','%'),
  ('home','hc3-desc','Year-over-year since founding'),
  ('home','srv-eye','What We Do'),
  ('home','srv-title','Built for complexity.<br>Designed for results.'),
  ('home','srv-sub','Six integrated practices that work as one — because real transformation doesn''t happen in silos.'),
  ('home','srv1-t','Strategy & Transformation'),
  ('home','srv1-d','Defining clear, actionable paths forward in environments of uncertainty. We align leadership, sharpen vision, and build the conditions for execution.'),
  ('home','srv2-t','Technology Advisory'),
  ('home','srv2-d','Bridging business vision with technical reality. From architecture decisions to vendor selection, we make technology choices you won''t regret.'),
  ('home','srv3-t','Digital Innovation'),
  ('home','srv3-d','Building the products and platforms of tomorrow — faster. We combine design thinking with engineering rigor to deliver experiences that actually ship.'),
  ('home','srv4-t','Financial Consulting'),
  ('home','srv4-d','Unlocking hidden value through intelligent financial strategy. We turn data into decisions across M&A, restructuring, and performance improvement.'),
  ('home','srv5-t','Operations Excellence'),
  ('home','srv5-d','Streamlining what slows you down. From supply chain to shared services, we redesign operations to run leaner, faster, and with less friction.'),
  ('home','srv6-t','Risk & Compliance'),
  ('home','srv6-d','Navigating regulatory complexity with confidence. We turn compliance from a burden into a competitive advantage — protecting what matters most.'),
  ('home','stats-eye','By the Numbers'),
  ('home','stats-title','Impact you can measure.'),
  ('home','about-eye','Who We Are'),
  ('home','about-title','Strategy is only as good as the people who execute it.'),
  ('home','about-p1','Founded in 2008, Meridian Group has guided Fortune 500 companies through their most complex transformations.'),
  ('home','about-p2','Our teams combine deep industry expertise with cutting-edge analytical capabilities.'),
  ('home','cta-title','Ready to navigate what''s next?'),
  ('home','cta-sub','Most of our best engagements started with a single conversation.'),
  ('home','cta-btn','Start the Conversation →'),
  ('home','ft-tag','We help ambitious organizations navigate complexity and build lasting advantage.'),

  -- Services
  ('services','srv-ph-title','Six practices.<br>One firm.'),
  ('services','srv-ph-sub','An integrated approach to strategy, technology, and transformation.'),
  ('services','proc-eye','How We Work'),
  ('services','proc-title','A process built for real problems.'),
  ('services','p1-t','Discover'),
  ('services','p2-t','Define'),
  ('services','p3-t','Design'),
  ('services','p4-t','Deliver'),

  -- About
  ('about','ab-ph-title','Strategy is a<br>human business.'),
  ('about','ab-story-title','Built to challenge the conventional consulting model.'),
  ('about','val-eye','Our Values'),
  ('about','val-title','What we believe.'),
  ('about','team-eye','Leadership'),
  ('about','team-title','The people who set the tone.'),
  ('about','off-eye','Our Offices'),

  -- Work
  ('work','wk-ph-title','Work that<br>defines industries.'),
  ('work','feat-tag','Banking · Digital Transformation · 2023'),

  -- Clients
  ('clients','cl-ph-title','Trusted by<br>the ambitious.'),
  ('clients','tst-eye','What Clients Say'),
  ('clients','tst-title','In their own words.'),

  -- Contact
  ('contact','ct-ph-title','Let''s start a<br>conversation.'),
  ('contact','ct-ph-sub','No pitch decks, no obligation. Just a genuine conversation about what you''re facing.')

ON CONFLICT (page, key) DO NOTHING;
