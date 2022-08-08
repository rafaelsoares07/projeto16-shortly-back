--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: witnpppqmkvfeh
--

CREATE TABLE "public"."urls" (
    "id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "url" "text" NOT NULL,
    "short_url" "text" NOT NULL,
    "views_cont" integer DEFAULT 0
);


ALTER TABLE public.urls OWNER TO witnpppqmkvfeh;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: witnpppqmkvfeh
--

CREATE SEQUENCE "public"."urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO witnpppqmkvfeh;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: witnpppqmkvfeh
--

ALTER SEQUENCE "public"."urls_id_seq" OWNED BY "public"."urls"."id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: witnpppqmkvfeh
--

CREATE TABLE "public"."users" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password" "text" NOT NULL
);


ALTER TABLE public.users OWNER TO witnpppqmkvfeh;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: witnpppqmkvfeh
--

CREATE SEQUENCE "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO witnpppqmkvfeh;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: witnpppqmkvfeh
--

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: witnpppqmkvfeh
--

ALTER TABLE ONLY "public"."urls" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."urls_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: witnpppqmkvfeh
--

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: witnpppqmkvfeh
--

COPY "public"."urls" ("id", "user_id", "url", "short_url", "views_cont") FROM stdin;
1	1	https://www.youtube.com/watch?v=trR0YkISbIo	UX3XXjI53O	0
2	1	https://www.youtube.com/watch?v=trR0YkISbIo	aFFMCGIdIX	0
3	1	https://www.youtube.com/watch?v=trR0YkISbIo	E7Ecd-awzq	0
4	3	https://www.youtube.com/watch?v=trR0YkISbIo	M1s3GjLoHH	0
5	3	https://www.youtube.com/watch?v=wXZVzEacE9I	DjssCGTDON	0
6	3	https://www.youtube.com/watch?v=wXZVzEacE9I	QtdDmtisIy	4
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: witnpppqmkvfeh
--

COPY "public"."users" ("id", "name", "email", "password") FROM stdin;
1	João	joao@driven.com.br	$2b$10$RLSJiQ8/mi62cVtMFGq3auSWlDJ82XEXzJvuPx9Mt.3Qeg.auG1cC
2	João	rafael@driven.com.br	$2b$10$qY84cJuY.v81WMK4QkKrWez8FVS6aluqFucWws8rzkPI2DNN7M0qa
3	rafael	rafael@gmail.com	$2b$10$Fjx.C1.4li/lxQ.Jrn2DO.Ik38PJ0EHuEy.Yil5/vCFcnXBEHB0FK
4	rafaelsss	rafaelsss@gmail.com	$2b$10$voa/UDxHuu.0t.5LPId60eg9MKVuBZg/A08yndrFb9QldfyTVxAfq
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: witnpppqmkvfeh
--

SELECT pg_catalog.setval('"public"."urls_id_seq"', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: witnpppqmkvfeh
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 4, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: witnpppqmkvfeh
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_pkey" PRIMARY KEY ("id");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: witnpppqmkvfeh
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: witnpppqmkvfeh
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");


--
-- PostgreSQL database dump complete
--

