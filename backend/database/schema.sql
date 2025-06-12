--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Homebrew)
-- Dumped by pg_dump version 16.8 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name, created_at, updated_at) FROM stdin;
1	Frontend	2025-06-08 18:05:47.851126	2025-06-08 18:05:47.851126
2	Backend	2025-06-08 18:05:47.851126	2025-06-08 18:05:47.851126
3	DevOps	2025-06-08 18:05:47.851126	2025-06-08 18:05:47.851126
4	Base de données	2025-06-08 18:05:47.851126	2025-06-08 18:05:47.851126
5	Outils	2025-06-08 18:05:47.851126	2025-06-08 18:05:47.851126
8	Méthodologies	2025-06-12 21:10:12.87086	2025-06-12 21:10:12.87086
\.


--
-- Data for Name: knowledges; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.knowledges (id, name, description, level, acquisition_date, category_id, created_at, updated_at) FROM stdin;
14	Jira		Avancé	\N	5	2025-06-12 20:43:04.81816	2025-06-12 20:45:38.336875
8	Git		Avancé	\N	5	2025-06-11 20:10:38.970321	2025-06-12 20:45:50.518657
7	Node.js		Intermédiaire	\N	2	2025-06-08 18:05:47.853263	2025-06-12 20:57:17.843494
1	React		Intermédiaire	\N	1	2025-06-08 18:05:47.853263	2025-06-12 20:57:20.925156
6	Tailwind CSS		Intermédiaire	\N	1	2025-06-08 18:05:47.853263	2025-06-12 20:57:30.991531
4	Docker		Débutant	\N	3	2025-06-08 18:05:47.853263	2025-06-12 20:57:35.175317
16	Html		Avancé	\N	1	2025-06-12 21:00:02.259525	2025-06-12 21:00:02.259525
17	MySQL		Avancé	\N	4	2025-06-12 21:00:40.222658	2025-06-12 21:00:52.067006
2	PostgreSQL		Avancé	\N	4	2025-06-08 18:05:47.853263	2025-06-12 21:00:55.748663
18	Trello		Avancé	\N	5	2025-06-12 21:02:22.343777	2025-06-12 21:02:22.343777
19	JavaScript		Intermédiaire	\N	1	2025-06-12 21:06:30.711503	2025-06-12 21:06:30.711503
20	Java		Débutant	\N	2	2025-06-12 21:07:35.624273	2025-06-12 21:07:35.624273
21	Visual Studio Code		Intermédiaire	\N	5	2025-06-12 21:08:55.161893	2025-06-12 21:08:55.161893
23	Méthode Agile		Avancé	\N	8	2025-06-12 21:10:29.849962	2025-06-12 21:10:29.849962
24	GitHub		Avancé	\N	3	2025-06-12 21:10:59.364609	2025-06-12 21:10:59.364609
25	Python		Intermédiaire	\N	2	2025-06-12 21:11:45.603305	2025-06-12 21:11:45.603305
26	Postman		Intermédiaire	\N	5	2025-06-12 21:12:31.26578	2025-06-12 21:12:31.26578
27	Insomnia		Débutant	\N	5	2025-06-12 21:12:45.628547	2025-06-12 21:12:45.628547
22	Pysharm		Intermédiaire	\N	5	2025-06-12 21:09:07.871283	2025-06-12 21:14:13.702431
28	WebStorm		Intermédiaire	\N	5	2025-06-12 21:14:02.709361	2025-06-12 21:14:17.325235
29	Android Studio		Intermédiaire	\N	5	2025-06-12 21:15:27.661612	2025-06-12 21:15:27.661612
30	Symfony		Intermédiaire	\N	2	2025-06-12 21:16:34.321537	2025-06-12 21:16:34.321537
31	Css		Intermédiaire	\N	1	2025-06-12 21:16:59.483787	2025-06-12 21:16:59.483787
32	Tailwind		Intermédiaire	\N	1	2025-06-12 21:17:33.7705	2025-06-12 21:17:33.7705
33	MariaDB		Débutant	\N	4	2025-06-12 21:19:54.64486	2025-06-12 21:19:54.64486
34	TypeScript		Intermédiaire	\N	1	2025-06-12 21:20:48.195039	2025-06-12 21:20:48.195039
3	PHP		Intermédiaire	\N	2	2025-06-08 18:05:47.853263	2025-06-12 21:21:36.453685
35	Unity		Débutant	\N	5	2025-06-12 21:23:46.856943	2025-06-12 21:23:46.856943
36	API Rest		Intermédiaire	\N	2	2025-06-12 21:24:35.070533	2025-06-12 21:24:35.070533
37	Figma		Débutant	\N	5	2025-06-12 21:25:01.89308	2025-06-12 21:25:01.89308
38	PgAdmin		Intermédiaire	\N	5	2025-06-12 21:25:42.824799	2025-06-12 21:25:42.824799
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: knowledges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.knowledges_id_seq', 38, true);


--
-- PostgreSQL database dump complete
--

