CREATE TABLE epg
(
    id integer NOT NULL DEFAULT nextval('epg_id_seq'::regclass),
    tv_source_info_url character varying COLLATE pg_catalog."default" NOT NULL,
    tv_source_info_name character varying COLLATE pg_catalog."default" NOT NULL,
    tv_generator_info_name character varying COLLATE pg_catalog."default" NOT NULL,
    tv_generator_info_url character varying COLLATE pg_catalog."default" NOT NULL,
    channel_id character varying COLLATE pg_catalog."default" NOT NULL,
    channel_display_name character varying COLLATE pg_catalog."default" NOT NULL,
    programme_start character varying COLLATE pg_catalog."default" NOT NULL,
    programme_stop character varying COLLATE pg_catalog."default" NOT NULL,
    programme_title character varying COLLATE pg_catalog."default" NOT NULL,
    programme_title_lang character varying COLLATE pg_catalog."default" NOT NULL,
    programme_desc character varying COLLATE pg_catalog."default" NOT NULL,
    programme_desc_lang character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT epg_pkey PRIMARY KEY (id)
)