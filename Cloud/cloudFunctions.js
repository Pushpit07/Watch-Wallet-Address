// Moralis cloud functions:
// * add address to watch list
// * alert on change of address state

// todo: implement various conditions to apply to wathced addresses
// todo: cross-chain compatible.
// todo: all hardcoded variables and settings are exposed to frontend UI
// todo: user accounts login/logout/etc

// ---

const sendTelegramAlert = async (request, tx_data, token_data) => {
    let prefix = "$";
    let sufffix = "";
    let address = tx_data.get("address");
    let condition = tx_data.get("conditions");
    let notes = tx_data.get("notes");

    // human readable message e.g. $3,000,000 transferred from wallet (0x…)
    // todo: fully convert to human readable values

    if (condition == "increase") {
        sufffix = "transferred to wallet address" + request.get("to_address");
    } else if (condition == "decrease") {
        sufffix = "transferred from wallet address" + request.get("from_address");
    } else {
        sufffix = "at wallet address (https://etherscan.io/tx/" + request.get("hash") + ")";
    }

    // temporary demo alert readout
    logger.info("----------------");
    logger.info("Notes: " + notes); // user notes
    logger.info(prefix + token_data.get("value") + " " + sufffix); // human readable sentence
    logger.info("-------- 🚨ALERT 🚨--------");

    // -------- Telegram creds --------
    const telegram_bot_id = "5018188726:AAHUtIEPbePzU6HQeoc17PkKiPQMRLazSYg"; // <-- ENTER TELEGRAM BOT ID
    const chat_id = "-1001515667431"; // <-- ENTER TELEGRAM CHAT ID

    // alert message
    let message = "https://mumbai.polygonscan.com/tx/" + request.get("hash");

    // Moralis httpRequest to Telegram API
    Moralis.Cloud.httpRequest({
        url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        params: "chat_id=" + chat_id + "&text=" + message,
    }).then(
        function (httpResponse) {
            logger.info(httpResponse.text);
        },
        function (httpResponse) {
            logger.info("Request failed with response code " + httpResponse.status);
        }
    );
};

// full description of how to set this up with Moralis x SendGrid here:
// https://youtu.be/SY30AUb8144
// docs here: https://docs.moralis.io/moralis-server/tools/sending-email

const sendEmailAlert = async (request) => {
    let _link = "https://mumbai.polygonscan.com/tx/" + request.get("hash");

    Moralis.Cloud.sendEmail({
        to: "xxx", // <-- ENTER EMAIL ADDRESS HERE
        templateId: "d-xxx", // <-- ENTER SENDGRID TEMPLATE ID HERE
        dynamic_template_data: {
            link: _link,
        },
    });
};

Moralis.Cloud.define("watchAddress", async (request) => {
    const logger = Moralis.Cloud.getLogger();
    logger.info("define Hello World");

    // check 1/2: address exists
    if (!request.params.address) {
        logger.info("error: missing address param.");
    } else {
        let address = request.params.address;
        // capture params
        // method of alerting
        let alert_method = request.params.alert_method;
        // conditions to be met
        let conditions = request.params.conditions;
        // user threshold
        let threshold = request.params.threshold;
        // user notes
        let notes = request.params.notes;

        if (!address || !alert_method) {
            return null;
        }

        // check 2/2: address is not already being watched
        const countQuery = new Moralis.Query("WatchedPolygonAddress");
        countQuery.equalTo("address", address);
        const watchCount = await countQuery.count();

        if (watchCount > 0) {
            // already on watch list, don't sync again
            return null;
        }

        // add address to watch list
        // sync all txs in realtime to WatchedPolygonAddress class
        await Moralis.Cloud.run("watchPolygonAddress", {
            address,
            sync_historical: false,
        });

        // check address has saved
        const query = new Moralis.Query("WatchedPolygonAddress");
        // get row of saved address
        query.equalTo("address", address);
        const row_object = await query.first();
        // set notes for that row
        row_object.set("notes", notes);
        // set alert method for that row
        row_object.set("alertMethod", alert_method);
        // set conditons for that row
        row_object.set("conditions", conditions);
        // set threshold
        row_object.set("threshold", threshold);

        // save row
        try {
            await row_object.save();
        } catch (err) {
            logger.info("ERROR saving row_object:", err);
        }

        // every time the 'to_address' or 'from_address' of tx is on our watch list, fire alert
        Moralis.Cloud.afterSave("PolygonTransactions", async function (request) {
            const confirmed = await request.object.get("confirmed");
            if (confirmed) {
                const logger = Moralis.Cloud.getLogger();
                logger.info("afterSave Hello World");

                // check address is in watch list
                let to_address = request.object.get("to_address");
                let from_address = request.object.get("from_address");

                // if tx related to watched addresses, fetch meta data
                const txCheckQuery = new Moralis.Query("WatchedPolygonAddress");
                // address of tx == to_address or from_address
                txCheckQuery.containedIn("address", [to_address, from_address]);
                // results = tx data
                let tx_data = await txCheckQuery.first();
                // set alert status
                let alert = false;

                logger.info("tx_data: " + JSON.stringify(tx_data));

                // tx_data exist, fire alert with link to block explorer
                if (tx_data) {
                    // temporary demo alert readout
                    // logger.info("------ YUP ------");
                    // logger.info("https://mumbai.polygonscan.com/tx/" + request.object.get("hash"));
                    // logger.info("--🚨ALERT 🚨--");

                    // alert method
                    let _alert_method = tx_data.get("alertMethod");
                    // conditions
                    let _conditions = tx_data.get("conditions");
                    // threshold
                    let _threshold = tx_data.get("threshold");

                    // check against user set condtions
                    // query token transfers for value
                    let tokenCheckQuery = new Moralis.Query("PolygonTransactions");
                    let token_data = null;
                    // if conditons set
                    if (_conditions) {
                        if (_conditions == "increase") {
                            tokenCheckQuery.equalTo("to_address", to_address);
                            // results = token data
                            token_data = await tokenCheckQuery.first();
                            if (token_data) {
                                alert = true;
                            }
                        } else if (_conditions == "decrease") {
                            tokenCheckQuery.equalTo("from_address", from_address);
                            // results = token data
                            token_data = await tokenCheckQuery.first();
                            if (token_data) {
                                alert = true;
                            }
                        } else if (_conditions == "change") {
                        } else {
                            alert = false;
                        }
                    } else {
                        tokenCheckQuery.containedIn(["to_address", "from_address"], [to_address, from_address]);
                        // results = token data
                        token_data = await tokenCheckQuery.first();
                        if (token_data) {
                            alert = true;
                        }
                    }

                    // if threshold set
                    if (alert == true && _threshold) {
                        // e.g. 3673168940000 > 3,000,000
                        if (token_data.get("value") >= _threshold) {
                            alert = true;
                        } else {
                            alert = false;
                        }
                    }

                    // if passed conditions for the saved address…
                    // pass instructions to allocated alert functions as request.object
                    if (alert == true) {
                        //if telegram selected
                        if (_alert_method == "telegram") {
                            // conditions
                            sendTelegramAlert(request.object, tx_data, token_data);
                        }
                        //if email selected
                        if (_alert_method == "email") {
                            //sendEmailAlert(request.object);
                        }
                        //if Twitter selected
                        if (_alert_method == "twitter") {
                            //todo: expose to twitter API
                            //sendTwitterAlert(request.object);
                        }
                    } else {
                        return false;
                    }

                    // todo: dispatch alerts via Telegram/Twitter/Native Push
                    // e.g. send alert: via email
                    /*  Moralis.Cloud.sendEmail({
                            to: request.user.get("email"),
                            templateId: "300ebeac203c4d8d9678163c78fc67e6",
                            dynamic_template_data: {
                                name: data.to_address
                            }
                        });
                    */
                    // todo: check if conditions regarding address are met
                    // todo: cross-chain, same code.
                }
            } else {
                // handle unconfirmed case
            }
        });

        return true;
    }
});
