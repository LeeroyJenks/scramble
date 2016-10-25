(function($) {

	$.fn.scramble = function(options) {

		if (this.length === 0) {
			console.log('nothing here!');
			return this;
		}
		var settings = $.extend({
			textClass: null,
			possible: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
			frames: 0,
			startTime: 5000,
			interval: 5000
		}, options);

		if (settings.textClass === null) {
			console.log('pick a textClass for location of texts!');
			return this;
		}
		var numberOfEl = this.length;

		return this.each(function(index) {
			var sEl = $(this);
			var $firstString = $(settings.textClass).first();
			var $nextString = $firstString.next();
			var $lastString = $(settings.textClass).last();

			var setupScramble = function() {
				var $el = $(sEl);
				var tO;
				var oldI = [];
				var newI = [];
				$(settings.textClass).hide();
				if ($firstString.children().length > 0) {
					$(sEl).html($firstString.html());
				} else {
					$(sEl).html($firstString.text());
				}

				tO = setTimeout(sStart, settings.startTime);

				function sStart() {
					//console.log(tO);
					//console.log('started');
					clearTimeout(tO);
					oldI = [];
					newI = [];
					var $childElements = $(sEl).children().addClass('old');
					var $firstOld = $childElements.first();
					$(sEl).children().each(function(index) {
						var $thisElement = $(this);
						oldI[index] = requestAnimationFrame(function() {
							sScrambleOut($thisElement.get(0), index);
						});
					});

					$nextString.children().each(function(index) {
						var $thisEl = $(this);
						var $thisClone = $thisEl.clone();
						$firstOld.before($thisClone.empty().attr('data-string', $thisEl.text()));
						newI[index] = requestAnimationFrame(function() {
							sScrambleIn($thisClone.get(0), index, $thisEl.text());
						});
					});
				}

				function sScrambleOut(childEl, n, frame) {
					var $thisChild = $(childEl);
					var thisFrame = frame || 0;
					if (thisFrame < settings.frames) {
						thisFrame++;
						oldI[n] = requestAnimationFrame(function() {
							sScrambleOut($thisChild.get(0), n, thisFrame);
						});
						return;
					} else {

						if ($thisChild.text().length < 1) {
							cancelAnimationFrame(oldI[n]);
							$thisChild.remove();
						} else {
							//console.log($thisChild.text());
							var thisText = $thisChild.text();
							var newText = '';
							if (thisText.length > 1) {
								$thisChild.text(thisText.substr(1, thisText.length));
								oldI[n] = requestAnimationFrame(function() {
									sScrambleOut($thisChild.get(0), n);
								});
								/*for (var i = 0; i < (thisText.length - 1); i++) {
								  newText += settings.possible.charAt(Math.floor(Math.random() * settings.possible.length));
								  if (i == thisText.length - 2) {
								    $thisChild.text(newText);
								    oldI[n] = requestAnimationFrame(function(){sScrambleOut($thisChild.get(0), n);});
								  }
								}*/
							} else {
								$thisChild.text('').remove();
							}
						}
					}
				}

				function sScrambleIn(childEl, n, s, frame) {
					var $thisChild = $(childEl);
					var thisFrame = frame || 0;
					//console.log('scrambleIn activated for ' + '"' + s + '"');

					if (thisFrame < settings.frames) {
						thisFrame++;
						newI[n] = requestAnimationFrame(function() {
							sScrambleIn($thisChild.get(0), n, s, thisFrame);
						});
						return;
					} else {
						if ($thisChild.text() == s) {
							cancelAnimationFrame(newI[n]);
							if ($thisChild.parent().text().length >= $nextString.text().length) {
								newI[0] = requestAnimationFrame(function() {
									revealWord($thisChild.parent().children().first().get(0), 0, $thisChild.parent().children().first().data('string'), 1);
								});
							}
						} else {
							if ($thisChild.text().length == s.length) {
								//console.log(s);
								//console.log('somehow happened');
								cancelAnimationFrame(newI[n]);
								if ($thisChild.parent().text().length >= $nextString.text().length) {
									newI[0] = requestAnimationFrame(function() {
										revealWord($thisChild.parent().children().first().get(0), 0, $thisChild.parent().children().first().data('string'), 1);
									});
								}
							} else {
								var thisText = $thisChild.text();
								var newText = '';
								//console.log(thisText);
								for (var i = 0; i < (thisText.length + 1); i++) {
									newText += settings.possible.charAt(Math.floor(Math.random() * settings.possible.length));
									if (i == thisText.length) {
										$thisChild.text(newText);
										newI[n] = requestAnimationFrame(function() {
											sScrambleIn($thisChild.get(0), n, s);
										});
									}
								}

							}
						}
					}
				}

				function revealWord(childEl, n, s, nOfReveal, frame) {
					//console.log('reveal');
					var $thisChild = $(childEl);
					var thisFrame = frame || 0;
					if (thisFrame < settings.frames) {
						//console.log('wait a frame');
						thisFrame++;
						newI[n] = requestAnimationFrame(function() {
							revealWord($thisChild.get(0), n, s, (nOfReveal), thisFrame);
						});
						return;
					} else {
						if ($thisChild.text() == s) {
							//console.log('this is done revealing');
							cancelAnimationFrame(newI[n]);
							if ($thisChild.next().length > 0) {
								newI[n + 1] = requestAnimationFrame(function() {
									revealWord($thisChild.next().get(0), n + 1, $thisChild.next().data('string'), 1);
								});
							}
						} else {
							var thisText = $thisChild.text();
							var newText = s.substr(0, nOfReveal);
							for (var i = 0; i < (thisText.length - (nOfReveal + 1) + 1); i++) {
								newText += settings.possible.charAt(Math.floor(Math.random() * settings.possible.length));
								if (i == (thisText.length - (nOfReveal + 1))) {
									$thisChild.text(newText);
									newI[n] = requestAnimationFrame(function() {
										revealWord($thisChild.get(0), n, s, (nOfReveal + 1));
									});
								}
								if ($thisChild.parent().text() == $nextString.text()) {
									$nextString = ($nextString.next().length > 0 ? $nextString.next() : $firstString);
									//console.log($firstString);
									//console.log('new timeout set');
									tO = setTimeout(sStart, settings.interval);
									//console.log('yay theyre the same!');
								} else {
									//console.log('text not equal: ' + $thisChild.parent().text());
								}
							}
							if (nOfReveal == s.length) {
								$thisChild.text(s).addClass('revealed');
								cancelAnimationFrame(newI[n]);
								if ($thisChild.next().length > 0) {
									newI[n + 1] = requestAnimationFrame(function() {
										revealWord($thisChild.next().get(0), n + 1, $thisChild.next().data('string'), 1);
									});
								}
								/*console.log('this jquery element html');
								console.log($thisChild.parent().text());
								console.log('original jquery element html');
								console.log($nextString.text());*/
								if ($thisChild.parent().text() == $nextString.text()) {
									$nextString = ($nextString.next().length > 0 ? $nextString.next() : $firstString);
									//console.log($firstString);
									//console.log('new timeout set');
									tO = setTimeout(sStart, settings.interval);
									//console.log('yay theyre the same!');
								} else {
									//console.log('text not equal: ' + $thisChild.parent().text());
								}
							} else {
								if ($thisChild.next().length > 0) {
									$thisChild.siblings(':not(.revealed)').each(function() {
										var $this = $(this);
										var siblingLength = $this.text().length;
										var siblingText = '';
										for (var i = 0; i < siblingLength; i++) {
											siblingText += settings.possible.charAt(Math.floor(Math.random() * settings.possible.length));
											if (i == (siblingLength - 1)) {
												$this.text(siblingText);
											}
										}
									});
									//newI[n+1] = requestAnimationFrame(function(){revealWord($thisChild.next().get(0), n+1, $thisChild.next().data('string'), 1);});
								}
							}
						}
					}
				}
			};

			setupScramble();

		});
	};
}(jQuery));