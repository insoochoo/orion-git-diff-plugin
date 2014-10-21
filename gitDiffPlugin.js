/*******************************************************************************
 * @license
 * Copyright (c) 2014 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 * Contributors: IBM Corporation - initial API and implementation
 ******************************************************************************/

define(["orion/xhr", "orion/plugin", "orion/Deferred", 'orion/URL-shim'], function(xhr, PluginProvider, Deferred) {
	var headers = {
		name: "Git Diff Annotation Plugin",
		version: "1.0", //$NON-NLS-0$
		description: "Git diff status as annotation"
	};

	var provider = new PluginProvider(headers);

	var serviceImpl = {
		computeDiff: function(diffURI) {
			var diffTarget = new URL(diffURI, window.location);
			diffTarget.query.set("parts", "diff");
            return xhr("GET", diffTarget.href, {
                headers: {
				    "Orion-Version": "1"
                },
                timeout: 10000
            }).then(function(result) {
                return result.responseText;
            });
		}
	};

	var properties = {
		name: "Git Diff",
		validationProperties: [
			{source: "Git", variableName: "Git"} //$NON-NLS-1$ //$NON-NLS-0$
		]
	};

	provider.registerService("orion.edit.gitDiff", serviceImpl, properties);//$NON-NLS-0$
	provider.connect();
});
