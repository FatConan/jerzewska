/* jslint esversion: 6 */
define(["jquery", "underscore"], function ($, _) {
    return class HighLevelEventHandler{
        constructor(options){
            this.debug = false;
            this.nullAction = function(e){};
            this.loadingWarning = function(){
                alert("Not loaded");
            };
            this.target = $(options.target);
            this.listeners = {};
            this.keyboardListeners = {};
            this.listen();
        }

        findParentTag(element, tagName){
            let upperTagName = tagName.toUpperCase();
            while(element && element.tagName !== null && element.tagName.toUpperCase() !== upperTagName){
                element = element.parentNode;
            }
            return element;
        }

        parentMatches(element, matchObj){
            while(element && element.tagName !== null){
                if(element.matches){
                    for(let m in matchObj){
                        if(matchObj.hasOwnProperty(m) && element.matches(m)){
                            return [element, m, matchObj[m]];
                        }
                    }
                }
                element = element.parentNode;
            }
            return [null, null, []];
        }

        match(element, matchStr){
            if(element !== null && element.matches){
                return element.matches(matchStr);
            }
            return false;
        }

        addListener(targetMatch, action){
            if(this.listeners[targetMatch]){
                this.listeners[targetMatch].push(action);
            }else{
                this.listeners[targetMatch] = [action];
            }
        }

        addKeyboardListener(targetMatch, character, action){
            if(this.keyboardListeners[character]){
                this.keyboardListeners[character][targetMatch].push(action);
            }else{
                let o = {};
                o[targetMatch] =  [action];
                this.keyboardListeners[character] = o;
            }
        }

        addNullListener(targetMatch){
            /* Add a null listener, used to allow elements within elements to invoke default behaviour when their parent has a listener present */
            this.addListener(targetMatch, this.nullAction);
        }

        enableDebug(){
            this.debug = true;
        }

        list(){
            for(let a in this.listeners){
                if(this.listeners.hasOwnProperty(a)){
                    console.log(a, this.listeners[a]);
                }
            }
        }

        listen(){
            /* We sometimes hit the scenario where not all of the events for a page have been registered. This means any
            javascript trigger links that have been marked up like <a href="#">Thing</a> cause the page to jump to the top.
            We can remove the href, but then they'd just do nothing instead. This listener, if triggered on such a link,
             prevents the default action of the event, then goes through its even list looking for a match.
             If it fails to find one to match said link then it pops up a "Sorry this isn't loaded yet" message prompting the user
             to try again.
             */
            this.clickEvent = "click";

            this.target.on("keyup", function(e){
                console.log(e);
                if(this.debug){
                    console.log("HIGH LEVEL EVENT HANDLER firing on ", e);
                }
                const el = e.target;
                const $el = $(el);
                console.log(el);

                let searchSpace = this.keyboardListeners[e.key];
                console.log(searchSpace);
                let match = this.parentMatches(el, searchSpace);
                if(match !== null && match[0] !== null){
                    /*
                      Check to see if we have a match in the listener list for the object being clicked by tracking up through the
                      DOM until we find a match. Harvest the details of those matching elements and pass them alongside the original event to
                      the registered action function.
                   */
                    $(match[2]).each(function(i, action){
                        if(this.debug){
                            console.log("HIGH LEVEL EVENT HANDLER performing actions for ", match, e);
                        }
                        action(e, {el: el, $el:$el, matchedEl: match[0], $matchedEl: $(match[0]), trigger: match[1]});
                    }.bind(this));
                }
            }.bind(this));

            this.target.on(this.clickEvent, function(e){
                if(this.debug){
                    console.log("HIGH LEVEL EVENT HANDLER firing on ", e);
                }
                const el = e.target;
                const $el = $(el);

                /*
                    Check to see if we're looking at a link with a "#" href, in which case we know we're dealing with a
                    link that's supposed to trigger a javascript event; Stop them making the page jump if nothing is loaded.
                 */
                let simpleTopLink = false;
                if($el.attr("href") === "#"){
                    if(this.debug){
                        console.log("HIGH LEVEL EVENT HANDLER suppressing default for empty link ", e);
                    }
                    e.preventDefault();
                    simpleTopLink = true;
                }

                let match = this.parentMatches(el, this.listeners);
                if(match !== null && match[0] !== null){
                    /*
                      Check to see if we have a match in the listener list for the object being clicked by tracking up through the
                      DOM until we find a match. Harvest the details of those matching elements and pass them alongside the original event to
                      the registered action function.
                   */
                    $(match[2]).each(function(i, action){
                        if(this.debug){
                            console.log("HIGH LEVEL EVENT HANDLER performing actions for ", match, e);
                        }
                        action(e, {el: el, $el:$el, matchedEl: match[0], $matchedEl: $(match[0]), trigger: match[1]});
                    }.bind(this));
                }else if(simpleTopLink){
                    /*
                        If we don't find a match, but the clicked element is a link with an href of "#" assume something else is supposed to be catching it that
                        hasn't been loaded yet (this highLevelHandler should load first, so check if there are events registered on the element) in which case just inform people that the page is still loading.
                     */
                    if(this.debug){
                        console.log("HIGH LEVEL EVENT HANDLER showing not loaded message on simple link ", e);
                    }
                    const ev = $._data(el, 'events');
                    if(!ev || !ev.click){
                        this.loadingWarning();
                    }
                }else if(this.debug){
                    /* Otherwise do nothing (or log we're doing nothing) */
                    console.log("HIGH LEVEL EVENT HANDLER taking no further action ", e);
                }
            }.bind(this));
        }
    };
});