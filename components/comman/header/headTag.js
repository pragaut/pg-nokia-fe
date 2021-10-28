import React, { Component } from 'react';
import Wrapper from '../../shared/Wrapper';
import Head from 'next/head';
// import config from '../../config';
// import * as helper from '../../helper';



class index extends Wrapper {
    constructor(props) {
        super(props);
        this.state = {
            // metaNewTTT: ""
        }
    }

    formatSecondsIntoDuration = (duration) => {
        if (!duration) {
            return undefined;
        }
        let minutes = parseInt(duration / 60);
        let seconds = duration % 60;

        if (minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds <= 9) {
            seconds = "0" + seconds;
        }

        return {
            minutes,
            seconds,
            format1: minutes + ':' + seconds,
            format2: minutes + ' MINS ' + seconds + ' SECS',
        };
    }


    render() {



        const { chapter, coursesForHead } = this.props
        let chapterDuration = coursesForHead ? this.formatSecondsIntoDuration(coursesForHead.duration) : undefined;

        const hardcodedExtraValues = {

            About: {
                title: 'About HR Audit | Anand Group Automotive Private Limited',
                description: "The Inter Company Recocilition."
            },
            office: {
                title: 'Our Office - Anand Group Automotive Private Limited',
                description: 'Our Office: We are situated at 1, Sri Aurobindo Marg, Hauz Khas,New Delhi – 110016 (India)'
            },
            privacyPolicy: {
                title: 'Privacy-Policy | Anand Group Automotive Private Limited',
                description: 'Privacy Policy: The information you provide is safe with us. To clear away all your privacy related issues, head to our Privacy page for the same.'
            }
        };


        let title = '';
        let description = '';

        if (this.props.router && this.props.router.query && this.props.router.query.page) {

            let pageName = this.props.router.query.page;
            let willGo = false;

            Object.keys(hardcodedExtraValues).forEach(function (key) {
                if (key === pageName) {
                    willGo = true;
                }
            });


            if (willGo) {
                title = hardcodedExtraValues[pageName]['title'];
                description = hardcodedExtraValues[pageName]['description'];
            }
            // console.log("From Head", pageName)
        }



        return (
            <Head>


                <script dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});
                    var alreadyThere = document.getElementById('gtm-tag');

                    if (alreadyThere) return;

                    var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;

                    f.parentNode.insertBefore(j,f);

                    j.id='gtm-tag';
                    })(window,document,'script','dataLayer','${process.env.GTM}')`
                }}>
                </script>


                {/* <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: `{
                    "@context": "http://schema.org",
                    "@type": "Organization",
                    "url": "https://thebigstack.com/",
                    "logo": "https://d1qpjs6wydep0a.cloudfront.net/tbs-logo.png",
                    "sameAs": ["https://www.linkedin.com/company/bigstackpokeruni/", "https://twitter.com/bigstackpoker_u", "https://www.facebook.com/bigstackpokeruni/", "https://www.instagram.com/bigstackpokeruni//"]
                    }`
                }}></script> */}





                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <meta name="google-site-verification" content="0oTJBkxHvORwnGKhGcQwKF2bAGv0GZPBt3VrVXRKXa4" /> */}
                <meta property="og:type" content="website" />
                <meta property="fb:app_id" content="389554594936637" />
                {/* <link rel="manifest" href="/manifest.json" /> */}
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-title" content="Anand Group" />
                {/* <meta name="google-site-verification" content="YBiQnmlM-DKaXmdl9Me6maoDM5EklIloB9rA0DNjJxw" /> */}
                {/* <link rel="apple-touch-icon" sizes="152x152" href="/icon-192x192" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192" /> */}
                <link rel="icon" href='favico.png' />
                {/* <link rel="canonical" href="https://anandgroupindia.com/" /> */}
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
                {/* <script src="https://apis.google.com/js/platform.js" async defer></script> */}
                {/* <meta name="google-signin-client_id" content="567890717322-sk4egq8ivh75lm5pa3bqtu3ig6p5ucj3.apps.googleusercontent.com" /> */}
                <title>Nokia  | Connecting People</title>
                {/* <meta name="description" content="Learn poker from the best in class. HD quality online video lessons on Texas Hold'em, PLO. winning pro tips, webinar, hand reviews, quizzes." />
                <meta name="twitter:description" content="Learn poker from the best in class. HD quality online video lessons on Texas Hold'em, PLO. winning pro tips, webinar, hand reviews, quizzes." />
                <meta name="og:description" content="Learn poker from the best in class. HD quality online video lessons on Texas Hold'em, PLO. winning pro tips, webinar, hand reviews, quizzes." />
                <meta name="twitter:image" content='https://d1qpjs6wydep0a.cloudfront.net/crest-vector.png' /> */}
                <meta property="og:image" content='https://d1qpjs6wydep0a.cloudfront.net/crest-vector.png' />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="/static/scss/main.scss" media="print" onLoad="this.media='all'; this.onload=null;"></link>

            </Head>
        )
    }
}


export default index;